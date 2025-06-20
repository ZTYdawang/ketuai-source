from flask import Blueprint, jsonify, request, g
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
from functools import wraps
import os

from src.models.user import User
from src.models.company import Company

auth_bp = Blueprint('auth', __name__)

# JWT密钥
SECRET_KEY = os.environ.get('SECRET_KEY', 'ketuai-secret-key')

# 生成JWT令牌
def generate_token(user_id):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
        'iat': datetime.datetime.utcnow(),
        'sub': user_id
    }
    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm='HS256'
    )

# 验证JWT令牌的装饰器
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # 从请求头中获取token
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'message': '缺少认证令牌'}), 401
        
        try:
            # 解码令牌
            data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            current_user = User.query.get(data['sub'])
            
            if not current_user:
                return jsonify({'message': '无效的用户令牌'}), 401
            
            # 将当前用户存储在g对象中，以便在视图函数中使用
            g.current_user = current_user
            
        except jwt.ExpiredSignatureError:
            return jsonify({'message': '令牌已过期，请重新登录'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': '无效的令牌'}), 401
        
        return f(*args, **kwargs)
    
    return decorated

# 注册接口
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # 验证必要字段
    required_fields = ['name', 'email', 'password', 'company', 'position']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'缺少必要字段: {field}'}), 400
    
    # 检查邮箱是否已存在
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': '该邮箱已被注册'}), 400
    
    # 检查公司是否已存在，不存在则创建
    company = Company.query.filter_by(name=data['company']).first()
    if not company:
        company = Company(name=data['company'])
        company.save()
    
    # 创建新用户
    new_user = User(
        name=data['name'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        company_id=company.id,
        position=data['position'],
        role='user'
    )
    new_user.save()
    
    # 生成令牌
    token = generate_token(new_user.id)
    
    return jsonify({
        'message': '注册成功',
        'token': token,
        'user': {
            'id': new_user.id,
            'name': new_user.name,
            'email': new_user.email,
            'company': company.name,
            'position': new_user.position,
            'role': new_user.role
        }
    }), 201

# 登录接口
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # 验证必要字段
    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': '请提供邮箱和密码'}), 400
    
    # 查找用户
    user = User.query.filter_by(email=data['email']).first()
    
    # 验证用户和密码
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': '邮箱或密码错误'}), 401
    
    # 获取公司信息
    company = Company.query.get(user.company_id)
    
    # 生成令牌
    token = generate_token(user.id)
    
    return jsonify({
        'message': '登录成功',
        'token': token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'company': company.name if company else None,
            'position': user.position,
            'role': user.role
        }
    }), 200

# 获取当前用户信息
@auth_bp.route('/me', methods=['GET'])
@token_required
def get_me():
    user = g.current_user
    company = Company.query.get(user.company_id)
    
    return jsonify({
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'company': company.name if company else None,
            'position': user.position,
            'role': user.role,
            'created_at': user.created_at.isoformat() if user.created_at else None
        }
    }), 200

# 修改密码
@auth_bp.route('/change-password', methods=['POST'])
@token_required
def change_password():
    data = request.get_json()
    user = g.current_user
    
    # 验证必要字段
    if not data or not data.get('old_password') or not data.get('new_password'):
        return jsonify({'message': '请提供旧密码和新密码'}), 400
    
    # 验证旧密码
    if not check_password_hash(user.password_hash, data['old_password']):
        return jsonify({'message': '旧密码错误'}), 401
    
    # 更新密码
    user.password_hash = generate_password_hash(data['new_password'])
    user.save()
    
    return jsonify({'message': '密码修改成功'}), 200

# 忘记密码 - 发送重置邮件
@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    
    # 验证必要字段
    if not data or not data.get('email'):
        return jsonify({'message': '请提供邮箱地址'}), 400
    
    # 查找用户
    user = User.query.filter_by(email=data['email']).first()
    
    if not user:
        # 为了安全，即使用户不存在也返回成功
        return jsonify({'message': '如果该邮箱已注册，我们将发送重置密码的邮件'}), 200
    
    # TODO: 实际项目中，这里应该生成重置令牌并发送邮件
    # 这里仅作为示例，返回成功
    
    return jsonify({'message': '如果该邮箱已注册，我们将发送重置密码的邮件'}), 200

# 重置密码
@auth_bp.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    
    # 验证必要字段
    if not data or not data.get('token') or not data.get('new_password'):
        return jsonify({'message': '请提供重置令牌和新密码'}), 400
    
    # TODO: 实际项目中，这里应该验证重置令牌并更新密码
    # 这里仅作为示例，返回成功
    
    return jsonify({'message': '密码重置成功，请使用新密码登录'}), 200
