from src.models.base import db
from datetime import datetime

class Requirement(db.Model):
    """需求模型"""
    __tablename__ = 'requirements'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    
    # 技术路线选择
    is_public = db.Column(db.Boolean, default=False)
    is_online = db.Column(db.Boolean, default=True)
    is_private = db.Column(db.Boolean, default=True)
    platform = db.Column(db.String(50))  # 飞书、百度千帆、扣子、Dify等
    requires_knowledge_base = db.Column(db.Boolean, default=False)
    knowledge_base_config = db.Column(db.Text)  # JSON格式存储知识库配置
    
    # 需求状态
    status = db.Column(db.String(20), default='pending')  # pending, approved, rejected, in_progress, completed
    priority = db.Column(db.String(20), default='medium')  # low, medium, high
    
    # 关联的AI应用（如果已创建）
    ai_agent_id = db.Column(db.Integer, db.ForeignKey('ai_agents.id'))
    
    # 时间戳
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    company = db.relationship('Company', backref='requirements')
    ai_agent = db.relationship('AIAgent', backref='requirement')
    
    def to_dict(self):
        """将模型实例转换为字典"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'creator_id': self.creator_id,
            'company_id': self.company_id,
            'is_public': self.is_public,
            'is_online': self.is_online,
            'is_private': self.is_private,
            'platform': self.platform,
            'requires_knowledge_base': self.requires_knowledge_base,
            'knowledge_base_config': self.knowledge_base_config,
            'status': self.status,
            'priority': self.priority,
            'ai_agent_id': self.ai_agent_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def save(self):
        """保存实例到数据库"""
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        """从数据库中删除实例"""
        db.session.delete(self)
        db.session.commit()
