from src.models.base import db
from datetime import datetime

class TokenUsage(db.Model):
    """Token使用记录模型"""
    __tablename__ = 'token_usages'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    ai_agent_id = db.Column(db.Integer, db.ForeignKey('ai_agents.id'), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    tokens_used = db.Column(db.Integer, nullable=False)
    conversation_id = db.Column(db.String(100))
    usage_type = db.Column(db.String(50))  # 使用类型：对话、知识库检索等
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # 关系
    company = db.relationship('Company', backref='token_usages')
    
    def to_dict(self):
        """将模型实例转换为字典"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'ai_agent_id': self.ai_agent_id,
            'company_id': self.company_id,
            'tokens_used': self.tokens_used,
            'conversation_id': self.conversation_id,
            'usage_type': self.usage_type,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def save(self):
        """保存实例到数据库"""
        db.session.add(self)
        db.session.commit()
        
    def delete(self):
        """从数据库中删除实例"""
        db.session.delete(self)
        db.session.commit()
