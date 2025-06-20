from flask import Blueprint, jsonify, request
from src.models.user import User
from src.models.company import Company
from src.models.ai_agent import AIAgent
from src.models.token_usage import TokenUsage
from src.models.requirement import Requirement
from src.utils.auth import admin_required
from datetime import datetime, timedelta
import json

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/login', methods=['POST'])
def admin_login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # 简单的管理员验证逻辑
    if username == 'admin' and password == 'admin123':
        return jsonify({
            'status': 'success',
            'message': '登录成功',
            'data': {
                'token': 'admin-token-placeholder',
                'user': {
                    'id': 1,
                    'username': 'admin',
                    'role': 'admin'
                }
            }
        })
    
    return jsonify({
        'status': 'error',
        'message': '用户名或密码错误'
    }), 401

@admin_bp.route('/dashboard/stats', methods=['GET'])
@admin_required
def dashboard_stats():
    # 获取仪表盘统计数据
    # 在实际应用中，这些数据应该从数据库中获取
    return jsonify({
        'status': 'success',
        'data': {
            'user_count': 24,
            'user_growth': 12,
            'ai_app_count': 86,
            'ai_app_growth': 18,
            'token_usage': 1200000,  # 1.2M
            'token_usage_change': -5,
            'pending_requirements': 12,
            'pending_requirements_growth': 8
        }
    })

@admin_bp.route('/ai-agents/stats', methods=['GET'])
@admin_required
def ai_agents_stats():
    # 获取AI智能体统计数据
    # 在实际应用中，这些数据应该从数据库中获取
    return jsonify({
        'status': 'success',
        'data': {
            'total_clicks': 42389,
            'token_usage': 3200000,  # 3.2M
            'avg_response_time': 1.2,  # 秒
            'active_users': 1257,
            'agents': [
                {
                    'id': 1,
                    'name': '客户服务助手',
                    'company': '北京科技有限公司',
                    'platform': '百度千帆',
                    'clicks': 12458,
                    'token_usage': 850000,  # 850K
                    'status': 'active',
                    'created_at': '2025-04-15'
                },
                {
                    'id': 2,
                    'name': '销售数据分析助手',
                    'company': '上海数据科技有限公司',
                    'platform': 'Dify',
                    'clicks': 8742,
                    'token_usage': 620000,  # 620K
                    'status': 'active',
                    'created_at': '2025-03-22'
                },
                {
                    'id': 3,
                    'name': '会议纪要助手',
                    'company': '广州智能科技有限公司',
                    'platform': '飞书',
                    'clicks': 5321,
                    'token_usage': 410000,  # 410K
                    'status': 'warning',
                    'created_at': '2025-05-01'
                },
                {
                    'id': 4,
                    'name': '政策问答智能体',
                    'company': '北京科技有限公司',
                    'platform': '扣子',
                    'clicks': 15868,
                    'token_usage': 1320000,  # 1.32M
                    'status': 'paused',
                    'created_at': '2025-02-10'
                }
            ]
        }
    })

@admin_bp.route('/token/stats', methods=['GET'])
@admin_required
def token_stats():
    # 获取Token统计数据
    # 在实际应用中，这些数据应该从数据库中获取
    return jsonify({
        'status': 'success',
        'data': {
            'monthly_usage': 3200000,  # 3.2M
            'growth_rate': 12.5,  # 12.5%
            'peak_usage': 250000,  # 250K/日
            'balance': 8500000,  # 8.5M
            'allocations': [
                {
                    'id': 1,
                    'name': '北京科技有限公司',
                    'type': 'company',
                    'quota': 5000000,  # 5M
                    'used': 2100000,  # 2.1M
                    'usage_rate': 42,
                    'status': 'normal'
                },
                {
                    'id': 2,
                    'name': '上海数据科技有限公司',
                    'type': 'company',
                    'quota': 3000000,  # 3M
                    'used': 620000,  # 620K
                    'usage_rate': 21,
                    'status': 'normal'
                },
                {
                    'id': 3,
                    'name': '政策问答智能体',
                    'type': 'agent',
                    'company': '北京科技有限公司',
                    'quota': 1500000,  # 1.5M
                    'used': 1320000,  # 1.32M
                    'usage_rate': 88,
                    'status': 'warning'
                }
            ],
            'recharge_records': [
                {
                    'id': 1,
                    'order_id': 'ORD20250515001',
                    'company': '北京科技有限公司',
                    'amount': 5000.00,
                    'tokens': 2500000,  # 2.5M
                    'time': '2025-05-15 14:30:25',
                    'status': 'success'
                },
                {
                    'id': 2,
                    'order_id': 'ORD20250510002',
                    'company': '上海数据科技有限公司',
                    'amount': 3000.00,
                    'tokens': 1500000,  # 1.5M
                    'time': '2025-05-10 09:15:42',
                    'status': 'success'
                },
                {
                    'id': 3,
                    'order_id': 'ORD20250505003',
                    'company': '广州智能科技有限公司',
                    'amount': 2000.00,
                    'tokens': 1000000,  # 1M
                    'time': '2025-05-05 16:45:10',
                    'status': 'success'
                },
                {
                    'id': 4,
                    'order_id': 'ORD20250501004',
                    'company': '北京科技有限公司',
                    'amount': 10000.00,
                    'tokens': 5000000,  # 5M
                    'time': '2025-05-01 10:20:35',
                    'status': 'success'
                }
            ]
        }
    })

@admin_bp.route('/requirements', methods=['GET'])
@admin_required
def get_requirements():
    # 获取需求列表
    # 在实际应用中，这些数据应该从数据库中获取
    return jsonify({
        'status': 'success',
        'data': {
            'requirements': [
                {
                    'id': 1,
                    'title': '客户服务智能助手',
                    'company': '北京科技有限公司',
                    'platform': '百度千帆',
                    'status': 'pending',
                    'created_at': '2025-05-20 10:15:30',
                    'budget': '10-20万元',
                    'delivery_time': '标准（3-4周）'
                },
                {
                    'id': 2,
                    'title': '财务报表分析工具',
                    'company': '上海数据科技有限公司',
                    'platform': 'Dify',
                    'status': 'in_progress',
                    'created_at': '2025-05-18 14:30:45',
                    'budget': '20-50万元',
                    'delivery_time': '加急（1-2周）'
                },
                {
                    'id': 3,
                    'title': '市场调研数据分析助手',
                    'company': '广州智能科技有限公司',
                    'platform': '飞书',
                    'status': 'completed',
                    'created_at': '2025-05-10 09:20:15',
                    'budget': '10-20万元',
                    'delivery_time': '标准（3-4周）'
                }
            ]
        }
    })

@admin_bp.route('/users', methods=['GET'])
@admin_required
def get_users():
    # 获取用户列表
    # 在实际应用中，这些数据应该从数据库中获取
    return jsonify({
        'status': 'success',
        'data': {
            'users': [
                {
                    'id': 1,
                    'username': 'beijing_tech',
                    'company_name': '北京科技有限公司',
                    'email': 'contact@beijingtech.com',
                    'phone': '010-12345678',
                    'status': 'active',
                    'created_at': '2025-04-10 08:30:15',
                    'last_login': '2025-05-25 14:20:30'
                },
                {
                    'id': 2,
                    'username': 'shanghai_data',
                    'company_name': '上海数据科技有限公司',
                    'email': 'info@shanghaidata.com',
                    'phone': '021-87654321',
                    'status': 'active',
                    'created_at': '2025-04-15 10:45:20',
                    'last_login': '2025-05-24 16:10:45'
                },
                {
                    'id': 3,
                    'username': 'guangzhou_ai',
                    'company_name': '广州智能科技有限公司',
                    'email': 'support@gzai.com',
                    'phone': '020-98765432',
                    'status': 'active',
                    'created_at': '2025-04-20 14:15:30',
                    'last_login': '2025-05-23 09:30:15'
                }
            ]
        }
    })

@admin_bp.route('/system/settings', methods=['GET'])
@admin_required
def get_system_settings():
    # 获取系统设置
    # 在实际应用中，这些数据应该从数据库中获取
    return jsonify({
        'status': 'success',
        'data': {
            'settings': {
                'token_price': 0.002,  # 每个Token的价格（元）
                'default_company_quota': 1000000,  # 默认企业配额
                'default_agent_quota': 500000,  # 默认智能体配额
                'warning_threshold': 80,  # 警告阈值（百分比）
                'system_maintenance': False,  # 系统维护模式
                'registration_open': True,  # 开放注册
                'api_rate_limit': 100  # API速率限制（每分钟请求数）
            }
        }
    })

@admin_bp.route('/system/settings', methods=['PUT'])
@admin_required
def update_system_settings():
    # 更新系统设置
    data = request.get_json()
    
    # 在实际应用中，这些数据应该保存到数据库中
    return jsonify({
        'status': 'success',
        'message': '系统设置已更新',
        'data': {
            'settings': data
        }
    })

@admin_bp.route('/token/allocate', methods=['POST'])
@admin_required
def allocate_token():
    # 分配Token配额
    data = request.get_json()
    
    # 在实际应用中，这些数据应该保存到数据库中
    return jsonify({
        'status': 'success',
        'message': 'Token配额已分配',
        'data': {
            'allocation': {
                'id': 4,
                'name': data.get('name'),
                'type': data.get('type'),
                'company': data.get('company', None),
                'quota': data.get('quota'),
                'used': 0,
                'usage_rate': 0,
                'status': 'normal'
            }
        }
    })

@admin_bp.route('/token/adjust', methods=['PUT'])
@admin_required
def adjust_token():
    # 调整Token配额
    data = request.get_json()
    allocation_id = data.get('id')
    new_quota = data.get('quota')
    
    # 在实际应用中，这些数据应该更新到数据库中
    return jsonify({
        'status': 'success',
        'message': 'Token配额已调整',
        'data': {
            'allocation': {
                'id': allocation_id,
                'quota': new_quota
            }
        }
    })

@admin_bp.route('/requirements/update', methods=['PUT'])
@admin_required
def update_requirement():
    # 更新需求状态
    data = request.get_json()
    requirement_id = data.get('id')
    new_status = data.get('status')
    
    # 在实际应用中，这些数据应该更新到数据库中
    return jsonify({
        'status': 'success',
        'message': '需求状态已更新',
        'data': {
            'requirement': {
                'id': requirement_id,
                'status': new_status
            }
        }
    })
