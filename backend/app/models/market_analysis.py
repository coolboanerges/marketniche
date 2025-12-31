"""
市场分析数据模型
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class MarketAnalysis(Base):
    """市场分析结果缓存表"""
    __tablename__ = "market_analysis"
    
    id = Column(Integer, primary_key=True, index=True)
    keyword_id = Column(Integer, ForeignKey("keywords.id"), nullable=False)
    market_size = Column(Integer)  # 市场容量（预估月销量）
    total_revenue = Column(Float)  # 总销售额（欧元）
    brand_concentration = Column(Float)  # 品牌集中度（0-1）
    seller_concentration = Column(Float)  # 卖家集中度（0-1）
    avg_reviews = Column(Float)  # 平均Review数量
    price_distribution = Column(JSON)  # 价格分布 {"10-20": 5, "20-30": 10, ...}
    trend_data = Column(JSON)  # 趋势数据
    analysis_date = Column(DateTime, server_default=func.now())
    
    # 关联关系
    keyword = relationship("Keyword")

