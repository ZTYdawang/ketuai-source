from src.models.base import db
from datetime import datetime

class User(db.Model):
    """用户模型"""
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'), nullable=False)
    position = db.Column(db.String(100))
    role = db.Column(db.String(20), default='user')  # user, admin
    avatar = db.Column(db.String(200))
    last_login = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # 关系
    company = db.relationship('Company', backref='users')
    ai_agents = db.relationship('AIAgent', backref='creator', lazy='dynamic')
    token_usages = db.relationship('TokenUsage', backref='user', lazy='dynamic')
    requirements = db.relationship('Requirement', backref='creator', lazy='dynamic')
    conversations = db.relationship('Conversation', backref='user', lazy='dynamic')
    
    def to_dict(self):
        """将模型实例转换为字典"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'company_id': self.company_id,
            'position': self.position,
            'role': self.role,
            'avatar': self.avatar,
            'last_login': self.last_login.isoformat() if self.last_login else None,
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
