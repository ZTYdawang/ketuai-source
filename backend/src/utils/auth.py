from functools import wraps
from flask import request, jsonify
import jwt
import datetime
import os

# 密钥，实际应用中应该从环境变量获取
SECRET_KEY = os.getenv('JWT_SECRET_KEY', 'ketuai-secret-key')

def generate_token(user_id, username, role):
    """生成JWT令牌"""
    payload = {
        'user_id': user_id,
        'username': username,
        'role': role,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)  # 令牌有效期1天
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def verify_token(token):
    """验证JWT令牌"""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None  # 令牌已过期
    except jwt.InvalidTokenError:
        return None  # 无效令牌

def login_required(f):
    """用户登录验证装饰器"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        
        # 从请求头中获取令牌
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({
                'status': 'error',
                'message': '缺少访问令牌'
            }), 401
        
        # 验证令牌
        payload = verify_token(token)
        if not payload:
            return jsonify({
                'status': 'error',
                'message': '无效或已过期的令牌'
            }), 401
        
        # 将用户信息添加到请求上下文
        request.user = payload
        
        return f(*args, **kwargs)
    
    return decorated_function

def admin_required(f):
    """管理员权限验证装饰器"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = None
        
        # 从请求头中获取令牌
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({
                'status': 'error',
                'message': '缺少访问令牌'
            }), 401
        
        # 验证令牌
        payload = verify_token(token)
        if not payload:
            return jsonify({
                'status': 'error',
                'message': '无效或已过期的令牌'
            }), 401
        
        # 验证管理员权限
        if payload.get('role') != 'admin':
            return jsonify({
                'status': 'error',
                'message': '需要管理员权限'
            }), 403
        
        # 将用户信息添加到请求上下文
        request.user = payload
        
        return f(*args, **kwargs)
    
    return decorated_function
