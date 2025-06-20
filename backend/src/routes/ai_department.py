from flask import Blueprint, request, jsonify
from datetime import datetime
from ..models.ai_department import AIDepartment, AIAgent
from ..utils.auth import login_required
from ..utils.response import success_response, error_response

ai_department_bp = Blueprint('ai_department', __name__)

@ai_department_bp.route('/api/ai-departments', methods=['GET'])
@login_required
def get_departments():
    """获取AI部门列表"""
    try:
        departments = AIDepartment.query.all()
        return success_response([d.to_dict() for d in departments])
    except Exception as e:
        return error_response(str(e))

@ai_department_bp.route('/api/ai-departments', methods=['POST'])
@login_required
def create_department():
    """创建新的AI部门"""
    try:
        data = request.get_json()
        
        # 验证必填字段
        required_fields = ['name', 'description']
        for field in required_fields:
            if field not in data:
                return error_response(f'Missing required field: {field}')
        
        department = AIDepartment(
            name=data['name'],
            description=data['description'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        department.save()
        return success_response(department.to_dict())
    except Exception as e:
        return error_response(str(e))

@ai_department_bp.route('/api/ai-departments/<int:id>', methods=['GET'])
@login_required
def get_department(id):
    """获取单个AI部门详情"""
    try:
        department = AIDepartment.query.get(id)
        if not department:
            return error_response('Department not found', 404)
        return success_response(department.to_dict())
    except Exception as e:
        return error_response(str(e))

@ai_department_bp.route('/api/ai-departments/<int:id>', methods=['PUT'])
@login_required
def update_department(id):
    """更新AI部门信息"""
    try:
        department = AIDepartment.query.get(id)
        if not department:
            return error_response('Department not found', 404)
        
        data = request.get_json()
        allowed_fields = ['name', 'description', 'status']
        
        for field in data:
            if field in allowed_fields:
                setattr(department, field, data[field])
        
        department.updated_at = datetime.now()
        department.save()
        
        return success_response(department.to_dict())
    except Exception as e:
        return error_response(str(e))

@ai_department_bp.route('/api/ai-departments/<int:id>', methods=['DELETE'])
@login_required
def delete_department(id):
    """删除AI部门"""
    try:
        department = AIDepartment.query.get(id)
        if not department:
            return error_response('Department not found', 404)
        
        department.delete()
        return success_response({'message': 'Department deleted successfully'})
    except Exception as e:
        return error_response(str(e))

# AI智能体相关接口
@ai_department_bp.route('/api/ai-departments/<int:dept_id>/agents', methods=['GET'])
@login_required
def get_agents(dept_id):
    """获取部门下的AI智能体列表"""
    try:
        agents = AIAgent.query.filter_by(department_id=dept_id).all()
        return success_response([a.to_dict() for a in agents])
    except Exception as e:
        return error_response(str(e))

@ai_department_bp.route('/api/ai-departments/<int:dept_id>/agents', methods=['POST'])
@login_required
def create_agent(dept_id):
    """创建新的AI智能体"""
    try:
        department = AIDepartment.query.get(dept_id)
        if not department:
            return error_response('Department not found', 404)
        
        data = request.get_json()
        required_fields = ['name', 'description', 'type']
        for field in required_fields:
            if field not in data:
                return error_response(f'Missing required field: {field}')
        
        agent = AIAgent(
            name=data['name'],
            description=data['description'],
            type=data['type'],
            department_id=dept_id,
            status='active',
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        agent.save()
        return success_response(agent.to_dict())
    except Exception as e:
        return error_response(str(e))

@ai_department_bp.route('/api/agents/<int:id>', methods=['GET'])
@login_required
def get_agent(id):
    """获取单个AI智能体详情"""
    try:
        agent = AIAgent.query.get(id)
        if not agent:
            return error_response('Agent not found', 404)
        return success_response(agent.to_dict())
    except Exception as e:
        return error_response(str(e))

@ai_department_bp.route('/api/agents/<int:id>', methods=['PUT'])
@login_required
def update_agent(id):
    """更新AI智能体信息"""
    try:
        agent = AIAgent.query.get(id)
        if not agent:
            return error_response('Agent not found', 404)
        
        data = request.get_json()
        allowed_fields = ['name', 'description', 'type', 'status', 'config']
        
        for field in data:
            if field in allowed_fields:
                setattr(agent, field, data[field])
        
        agent.updated_at = datetime.now()
        agent.save()
        
        return success_response(agent.to_dict())
    except Exception as e:
        return error_response(str(e))

@ai_department_bp.route('/api/agents/<int:id>', methods=['DELETE'])
@login_required
def delete_agent(id):
    """删除AI智能体"""
    try:
        agent = AIAgent.query.get(id)
        if not agent:
            return error_response('Agent not found', 404)
        
        agent.delete()
        return success_response({'message': 'Agent deleted successfully'})
    except Exception as e:
        return error_response(str(e))

@ai_department_bp.route('/api/agents/<int:id>/toggle', methods=['POST'])
@login_required
def toggle_agent(id):
    """切换AI智能体状态（启用/禁用）"""
    try:
        agent = AIAgent.query.get(id)
        if not agent:
            return error_response('Agent not found', 404)
        
        agent.status = 'inactive' if agent.status == 'active' else 'active'
        agent.updated_at = datetime.now()
        agent.save()
        
        return success_response(agent.to_dict())
    except Exception as e:
        return error_response(str(e)) 