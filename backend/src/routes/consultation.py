from flask import Blueprint, request, jsonify
from datetime import datetime
from ..models.consultation import Consultation
from ..utils.auth import login_required
from ..utils.response import success_response, error_response

consultation_bp = Blueprint('consultation', __name__)

@consultation_bp.route('/api/consultations', methods=['GET'])
@login_required
def get_consultations():
    """获取咨询列表"""
    try:
        consultations = Consultation.query.all()
        return success_response([c.to_dict() for c in consultations])
    except Exception as e:
        return error_response(str(e))

@consultation_bp.route('/api/consultations', methods=['POST'])
@login_required
def create_consultation():
    """创建新的咨询需求"""
    try:
        data = request.get_json()
        
        # 验证必填字段
        required_fields = ['title', 'description', 'priority']
        for field in required_fields:
            if field not in data:
                return error_response(f'Missing required field: {field}')
        
        consultation = Consultation(
            title=data['title'],
            description=data['description'],
            priority=data['priority'],
            status='pending',
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        consultation.save()
        return success_response(consultation.to_dict())
    except Exception as e:
        return error_response(str(e))

@consultation_bp.route('/api/consultations/<int:id>', methods=['GET'])
@login_required
def get_consultation(id):
    """获取单个咨询详情"""
    try:
        consultation = Consultation.query.get(id)
        if not consultation:
            return error_response('Consultation not found', 404)
        return success_response(consultation.to_dict())
    except Exception as e:
        return error_response(str(e))

@consultation_bp.route('/api/consultations/<int:id>', methods=['PUT'])
@login_required
def update_consultation(id):
    """更新咨询信息"""
    try:
        consultation = Consultation.query.get(id)
        if not consultation:
            return error_response('Consultation not found', 404)
        
        data = request.get_json()
        allowed_fields = ['title', 'description', 'priority', 'status', 'tech_route', 'platform']
        
        for field in data:
            if field in allowed_fields:
                setattr(consultation, field, data[field])
        
        consultation.updated_at = datetime.now()
        consultation.save()
        
        return success_response(consultation.to_dict())
    except Exception as e:
        return error_response(str(e))

@consultation_bp.route('/api/consultations/<int:id>', methods=['DELETE'])
@login_required
def delete_consultation(id):
    """删除咨询"""
    try:
        consultation = Consultation.query.get(id)
        if not consultation:
            return error_response('Consultation not found', 404)
        
        consultation.delete()
        return success_response({'message': 'Consultation deleted successfully'})
    except Exception as e:
        return error_response(str(e))

@consultation_bp.route('/api/consultations/<int:id>/tech-route', methods=['POST'])
@login_required
def set_tech_route(id):
    """设置技术路线"""
    try:
        consultation = Consultation.query.get(id)
        if not consultation:
            return error_response('Consultation not found', 404)
        
        data = request.get_json()
        if 'tech_route' not in data:
            return error_response('Missing tech_route field')
        
        consultation.tech_route = data['tech_route']
        consultation.updated_at = datetime.now()
        consultation.save()
        
        return success_response(consultation.to_dict())
    except Exception as e:
        return error_response(str(e))

@consultation_bp.route('/api/consultations/<int:id>/platform', methods=['POST'])
@login_required
def set_platform(id):
    """设置开发平台"""
    try:
        consultation = Consultation.query.get(id)
        if not consultation:
            return error_response('Consultation not found', 404)
        
        data = request.get_json()
        if 'platform' not in data:
            return error_response('Missing platform field')
        
        consultation.platform = data['platform']
        consultation.updated_at = datetime.now()
        consultation.save()
        
        return success_response(consultation.to_dict())
    except Exception as e:
        return error_response(str(e)) 