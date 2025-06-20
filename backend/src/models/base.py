# SQLAlchemy 全局实例，由 models 包统一导出
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Base:
    """基础模型类，提供共用方法"""
    
    def to_dict(self):
        """将模型实例转换为字典"""
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
