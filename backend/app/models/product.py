"""
产品数据模型
"""
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class Product(Base):
    """产品基础信息表"""
    __tablename__ = "products"
    
    id = Column(Integer, primary_key=True, index=True)
    asin = Column(String(20), unique=True, index=True, nullable=False)
    title = Column(Text, nullable=False)
    price = Column(Float)
    currency = Column(String(3), default="EUR")
    image_url = Column(String(500))
    category = Column(String(200))
    brand = Column(String(200))
    seller_type = Column(String(10))  # FBA or FBM
    review_count = Column(Integer, default=0)
    review_rating = Column(Float)
    bsr = Column(Integer)  # Best Seller Rank
    first_seen_date = Column(DateTime, server_default=func.now())
    last_updated = Column(DateTime, server_default=func.now(), onupdate=func.now())
    
    # 关联关系
    history = relationship("ProductHistory", back_populates="product", cascade="all, delete-orphan")

class ProductHistory(Base):
    """产品历史数据表（价格、排名变化）"""
    __tablename__ = "product_history"
    
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    date = Column(DateTime, server_default=func.now(), nullable=False)
    price = Column(Float)
    bsr = Column(Integer)
    review_count = Column(Integer)
    review_rating = Column(Float)
    
    # 关联关系
    product = relationship("Product", back_populates="history")

