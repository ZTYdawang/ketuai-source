from src.models.base import db
from datetime import datetime

class AIAgent(db.Model):
    """AI应用模型"""
    __tablename__ = 'ai_agents'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    platform = db.Column(db.String(50), nullable=False)  # 飞书、百度千帆、扣子、Dify等
    type = db.Column(db.String(50))  # 应用类型：客服、数据分析、文档处理等
    status = db.Column(db.String(20), default='inactive')  # active, inactive
    icon = db.Column(db.String(50), default='🤖')
    color = db.Column(db.String(50), default='bg-blue-100')
    is_public = db.Column(db.Boolean, default=False)
    is_online = db.Column(db.Boolean, default=True)
    is_private = db.Column(db.Boolean, default=True)
    requires_knowledge_base = db.Column(db.Boolean, default=False)
    knowledge_base_id = db.Column(db.Integer)
    api_key = db.Column(db.String(200))
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    last_used = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    company = db.relationship('Company', backref='ai_agents')
    token_usages = db.relationship('TokenUsage', backref='ai_agent', lazy='dynamic')
    conversations = db.relationship('Conversation', backref='agent', lazy='dynamic')
    
    def to_dict(self):
        """将模型实例转换为字典"""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'platform': self.platform,
            'type': self.type,
            'status': self.status,
            'icon': self.icon,
            'color': self.color,
            'is_public': self.is_public,
            'is_online': self.is_online,
            'is_private': self.is_private,
            'requires_knowledge_base': self.requires_knowledge_base,
            'knowledge_base_id': self.knowledge_base_id,
            'creator_id': self.creator_id,
            'company_id': self.company_id,
            'last_used': self.last_used.isoformat() if self.last_used else None,
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
