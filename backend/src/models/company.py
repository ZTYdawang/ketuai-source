from src.models.base import db
from datetime import datetime

class Company(db.Model):
    """公司模型"""
    __tablename__ = 'companies'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    industry = db.Column(db.String(100))
    size = db.Column(db.String(50))  # 公司规模：小型、中型、大型
    address = db.Column(db.String(200))
    contact_phone = db.Column(db.String(20))
    contact_email = db.Column(db.String(100))
    logo = db.Column(db.String(200))
    token_balance = db.Column(db.Integer, default=0)  # Token余额
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """将模型实例转换为字典"""
        return {
            'id': self.id,
            'name': self.name,
            'industry': self.industry,
            'size': self.size,
            'address': self.address,
            'contact_phone': self.contact_phone,
            'contact_email': self.contact_email,
            'logo': self.logo,
            'token_balance': self.token_balance,
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
