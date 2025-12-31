"""
关键词数据模型
"""
from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from app.database import Base

class Keyword(Base):
    """关键词表"""
    __tablename__ = "keywords"
    
    id = Column(Integer, primary_key=True, index=True)
    keyword = Column(String(200), unique=True, index=True, nullable=False)
    search_volume = Column(Integer)  # 搜索量（月度）
    competition_score = Column(Float)  # 竞争度得分（0-1）
    trend = Column(String(20))  # 上升/下降/平稳
    last_updated = Column(DateTime, server_default=func.now(), onupdate=func.now())

