from flask import Blueprint, jsonify, request, g
from src.routes.auth import token_required
from src.models.user import User
from src.models.company import Company
from src.models.ai_agent import AIAgent
from src.models.token_usage import TokenUsage
from sqlalchemy import func, desc
import datetime
from src.models.conversation import Conversation
import uuid

user_bp = Blueprint('user', __name__)

# 获取用户个人信息
@user_bp.route('/profile', methods=['GET'])
@token_required
def get_profile():
    user = g.current_user
    company = Company.query.get(user.company_id)
    
    # 获取用户创建的AI应用数量
    ai_agent_count = AIAgent.query.filter_by(creator_id=user.id).count()
    
    # 获取用户的Token使用量
    token_usage = TokenUsage.query.filter_by(user_id=user.id).with_entities(
        func.sum(TokenUsage.tokens_used).label('total_tokens')
    ).scalar() or 0
    
    return jsonify({
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'position': user.position,
            'role': user.role,
            'avatar': user.avatar,
            'last_login': user.last_login.isoformat() if user.last_login else None,
            'created_at': user.created_at.isoformat() if user.created_at else None
        },
        'company': {
            'id': company.id,
            'name': company.name,
            'industry': company.industry,
            'size': company.size,
            'logo': company.logo,
            'token_balance': company.token_balance
        } if company else None,
        'stats': {
            'ai_agent_count': ai_agent_count,
            'token_usage': token_usage
        }
    }), 200

# 更新用户个人信息
@user_bp.route('/profile', methods=['PUT'])
@token_required
def update_profile():
    user = g.current_user
    data = request.get_json()
    
    # 更新用户信息
    if 'name' in data:
        user.name = data['name']
    
    if 'position' in data:
        user.position = data['position']
    
    if 'avatar' in data:
        user.avatar = data['avatar']
    
    user.save()
    
    return jsonify({
        'message': '个人信息更新成功',
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'position': user.position,
            'role': user.role,
            'avatar': user.avatar,
            'last_login': user.last_login.isoformat() if user.last_login else None,
            'created_at': user.created_at.isoformat() if user.created_at else None
        }
    }), 200

# 获取公司员工列表
@user_bp.route('/employees', methods=['GET'])
@token_required
def get_employees():
    user = g.current_user
    
    # 获取查询参数
    search = request.args.get('search', '')
    role = request.args.get('role', 'all')
    
    # 基础查询：获取当前用户所在公司的所有员工
    query = User.query.filter_by(company_id=user.company_id)
    
    # 应用筛选条件
    if role != 'all':
        query = query.filter_by(role=role)
    
    if search:
        query = query.filter(
            (User.name.ilike(f'%{search}%')) | 
            (User.email.ilike(f'%{search}%')) |
            (User.position.ilike(f'%{search}%'))
        )
    
    # 按创建时间降序排序
    query = query.order_by(desc(User.created_at))
    
    # 执行查询
    employees = query.all()
    
    # 获取每个员工的统计数据
    result = []
    for employee in employees:
        # 获取员工创建的AI应用数量
        ai_agent_count = AIAgent.query.filter_by(creator_id=employee.id).count()
        
        # 获取员工的Token使用量
        token_usage = TokenUsage.query.filter_by(user_id=employee.id).with_entities(
            func.sum(TokenUsage.tokens_used).label('total_tokens')
        ).scalar() or 0
        
        # 构建员工数据
        employee_data = {
            'id': employee.id,
            'name': employee.name,
            'email': employee.email,
            'position': employee.position,
            'role': employee.role,
            'avatar': employee.avatar,
            'created_at': employee.created_at.isoformat() if employee.created_at else None,
            'stats': {
                'ai_agent_count': ai_agent_count,
                'token_usage': token_usage
            }
        }
        
        result.append(employee_data)
    
    return jsonify({
        'employees': result,
        'total': len(result)
    }), 200

# 添加新员工（仅管理员可用）
@user_bp.route('/employees', methods=['POST'])
@token_required
def add_employee():
    user = g.current_user
    
    # 检查权限
    if user.role != 'admin':
        return jsonify({'message': '权限不足，仅管理员可添加员工'}), 403
    
    data = request.get_json()
    
    # 验证必要字段
    required_fields = ['name', 'email', 'password', 'position']
    for field in required_fields:
        if field not in data:
            return jsonify({'message': f'缺少必要字段: {field}'}), 400
    
    # 检查邮箱是否已存在
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': '该邮箱已被注册'}), 400
    
    # 创建新员工
    from werkzeug.security import generate_password_hash
    
    new_employee = User(
        name=data['name'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        company_id=user.company_id,
        position=data['position'],
        role=data.get('role', 'user')
    )
    
    new_employee.save()
    
    return jsonify({
        'message': '员工添加成功',
        'employee': {
            'id': new_employee.id,
            'name': new_employee.name,
            'email': new_employee.email,
            'position': new_employee.position,
            'role': new_employee.role,
            'created_at': new_employee.created_at.isoformat() if new_employee.created_at else None
        }
    }), 201

# 更新员工信息（仅管理员可用）
@user_bp.route('/employees/<int:employee_id>', methods=['PUT'])
@token_required
def update_employee(employee_id):
    user = g.current_user
    
    # 检查权限
    if user.role != 'admin':
        return jsonify({'message': '权限不足，仅管理员可更新员工信息'}), 403
    
    # 查询员工
    employee = User.query.filter_by(id=employee_id, company_id=user.company_id).first()
    
    if not employee:
        return jsonify({'message': '未找到该员工或无权访问'}), 404
    
    data = request.get_json()
    
    # 更新员工信息
    if 'name' in data:
        employee.name = data['name']
    
    if 'position' in data:
        employee.position = data['position']
    
    if 'role' in data:
        employee.role = data['role']
    
    if 'password' in data:
        from werkzeug.security import generate_password_hash
        employee.password_hash = generate_password_hash(data['password'])
    
    employee.save()
    
    return jsonify({
        'message': '员工信息更新成功',
        'employee': {
            'id': employee.id,
            'name': employee.name,
            'email': employee.email,
            'position': employee.position,
            'role': employee.role,
            'created_at': employee.created_at.isoformat() if employee.created_at else None
        }
    }), 200

# 删除员工（仅管理员可用）
@user_bp.route('/employees/<int:employee_id>', methods=['DELETE'])
@token_required
def delete_employee(employee_id):
    user = g.current_user
    
    # 检查权限
    if user.role != 'admin':
        return jsonify({'message': '权限不足，仅管理员可删除员工'}), 403
    
    # 查询员工
    employee = User.query.filter_by(id=employee_id, company_id=user.company_id).first()
    
    if not employee:
        return jsonify({'message': '未找到该员工或无权访问'}), 404
    
    # 不能删除自己
    if employee.id == user.id:
        return jsonify({'message': '不能删除自己的账号'}), 400
    
    # 删除员工
    employee.delete()
    
    return jsonify({
        'message': '员工删除成功'
    }), 200

# 获取用户活动记录
@user_bp.route('/activities', methods=['GET'])
@token_required
def get_activities():
    user = g.current_user
    
    # 获取时间范围参数
    time_range = request.args.get('time_range', 'week')  # day, week, month, year, all
    
    # 计算时间范围
    now = datetime.datetime.utcnow()
    if time_range == 'day':
        start_time = now - datetime.timedelta(days=1)
    elif time_range == 'week':
        start_time = now - datetime.timedelta(weeks=1)
    elif time_range == 'month':
        start_time = now - datetime.timedelta(days=30)
    elif time_range == 'year':
        start_time = now - datetime.timedelta(days=365)
    else:  # all
        start_time = datetime.datetime(1970, 1, 1)
    
    # 查询用户的Token使用记录
    activities_query = TokenUsage.query.filter(
        TokenUsage.user_id == user.id,
        TokenUsage.created_at >= start_time
    ).order_by(
        desc(TokenUsage.created_at)
    )
    
    # 执行查询
    activities = activities_query.all()
    
    # 构建活动数据
    result = []
    for activity in activities:
        agent = AIAgent.query.get(activity.ai_agent_id)
        
        activity_data = {
            'id': activity.id,
            'type': 'app_usage',
            'ai_agent': {
                'id': agent.id,
                'name': agent.name,
                'platform': agent.platform,
                'icon': agent.icon
            } if agent else None,
            'tokens_used': activity.tokens_used,
            'conversation_id': activity.conversation_id,
            'usage_type': activity.usage_type,
            'created_at': activity.created_at.isoformat() if activity.created_at else None
        }
        
        result.append(activity_data)
    
    return jsonify({
        'activities': result,
        'total': len(result),
        'time_range': time_range
    }), 200

# 获取用户统计数据
@user_bp.route('/stats', methods=['GET'])
@token_required
def get_stats():
    user = g.current_user
    
    # 获取时间范围参数
    time_range = request.args.get('time_range', 'month')  # day, week, month, year, all
    
    # 计算时间范围
    now = datetime.datetime.utcnow()
    if time_range == 'day':
        start_time = now - datetime.timedelta(days=1)
    elif time_range == 'week':
        start_time = now - datetime.timedelta(weeks=1)
    elif time_range == 'month':
        start_time = now - datetime.timedelta(days=30)
    elif time_range == 'year':
        start_time = now - datetime.timedelta(days=365)
    else:  # all
        start_time = datetime.datetime(1970, 1, 1)
    
    # 查询用户的Token使用量
    token_usage = TokenUsage.query.filter(
        TokenUsage.user_id == user.id,
        TokenUsage.created_at >= start_time
    ).with_entities(
        func.sum(TokenUsage.tokens_used).label('total_tokens')
    ).scalar() or 0
    
    # 查询用户的对话数量
    conversation_count = TokenUsage.query.filter(
        TokenUsage.user_id == user.id,
        TokenUsage.created_at >= start_time
    ).distinct(
        TokenUsage.conversation_id
    ).count()
    
    # 查询用户使用的AI应用数量
    ai_agent_count = TokenUsage.query.filter(
        TokenUsage.user_id == user.id,
        TokenUsage.created_at >= start_time
    ).distinct(
        TokenUsage.ai_agent_id
    ).count()
    
    # 按日期分组的Token使用量
    daily_usage = []
    if time_range in ['day', 'week', 'month']:
        # 按天分组
        daily_results = db.session.query(
            func.date(TokenUsage.created_at).label('date'),
            func.sum(TokenUsage.tokens_used).label('tokens')
        ).filter(
            TokenUsage.user_id == user.id,
            TokenUsage.created_at >= start_time
        ).group_by(
            func.date(TokenUsage.created_at)
        ).order_by(
            func.date(TokenUsage.created_at)
        ).all()
        
        for result in daily_results:
            daily_usage.append({
                'date': result.date.isoformat(),
                'tokens': result.tokens
            })
    
    # 按AI应用分组的Token使用量
    agent_usage = []
    agent_results = db.session.query(
        TokenUsage.ai_agent_id,
        func.sum(TokenUsage.tokens_used).label('tokens')
    ).filter(
        TokenUsage.user_id == user.id,
        TokenUsage.created_at >= start_time
    ).group_by(
        TokenUsage.ai_agent_id
    ).order_by(
        desc('tokens')
    ).all()
    
    for result in agent_results:
        agent = AIAgent.query.get(result.ai_agent_id)
        if agent:
            agent_usage.append({
                'ai_agent_id': agent.id,
                'name': agent.name,
                'platform': agent.platform,
                'icon': agent.icon,
                'tokens': result.tokens
            })
    
    return jsonify({
        'token_usage': token_usage,
        'conversation_count': conversation_count,
        'ai_agent_count': ai_agent_count,
        'daily_usage': daily_usage,
        'agent_usage': agent_usage,
        'time_range': time_range
    }), 200

# 获取当前用户的所有会话
@user_bp.route('/conversations', methods=['GET'])
@token_required
def list_conversations():
    user = g.current_user
    conversations = Conversation.query.filter_by(user_id=user.id).order_by(Conversation.last_updated.desc()).all()
    return jsonify([c.to_dict() for c in conversations]), 200

# 新建会话
@user_bp.route('/conversations', methods=['POST'])
@token_required
def create_conversation():
    user = g.current_user
    data = request.get_json() or {}
    conv = Conversation(
        id=str(uuid.uuid4()),
        user_id=user.id,
        agent_id=data.get('agent_id'),
        title=data.get('title', '新对话'),
        summary=data.get('summary', ''),
    )
    conv.save()
    return jsonify(conv.to_dict()), 201

# 获取单个会话详情
@user_bp.route('/conversations/<conv_id>', methods=['GET'])
@token_required
def get_conversation(conv_id):
    user = g.current_user
    conv = Conversation.query.filter_by(id=conv_id, user_id=user.id).first()
    if not conv:
        return jsonify({'message': '会话不存在'}), 404
    return jsonify(conv.to_dict()), 200

# 删除会话
@user_bp.route('/conversations/<conv_id>', methods=['DELETE'])
@token_required
def delete_conversation(conv_id):
    user = g.current_user
    conv = Conversation.query.filter_by(id=conv_id, user_id=user.id).first()
    if not conv:
        return jsonify({'message': '会话不存在'}), 404
    conv.delete()
    return jsonify({'message': '会话已删除'}), 200

# 更新会话摘要/标题
@user_bp.route('/conversations/<conv_id>', methods=['PATCH'])
@token_required
def update_conversation(conv_id):
    user = g.current_user
    conv = Conversation.query.filter_by(id=conv_id, user_id=user.id).first()
    if not conv:
        return jsonify({'message': '会话不存在'}), 404
    data = request.get_json() or {}
    if 'title' in data:
        conv.title = data['title']
    if 'summary' in data:
        conv.summary = data['summary']
    conv.save()
    return jsonify(conv.to_dict()), 200
