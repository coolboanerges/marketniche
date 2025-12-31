"""
产品相关的Pydantic模型（API请求/响应）
"""
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class ProductBase(BaseModel):
    asin: str
    title: str
    price: Optional[float] = None
    currency: str = "EUR"
    image_url: Optional[str] = None
    category: Optional[str] = None
    brand: Optional[str] = None
    seller_type: Optional[str] = None
    review_count: int = 0
    review_rating: Optional[float] = None
    bsr: Optional[int] = None

class ProductCreate(ProductBase):
    """创建产品时的模型"""
    pass

class Product(ProductBase):
    """产品响应模型"""
    id: int
    first_seen_date: datetime
    last_updated: datetime
    
    class Config:
        from_attributes = True

class ProductHistory(BaseModel):
    """产品历史数据模型"""
    id: int
    product_id: int
    date: datetime
    price: Optional[float] = None
    bsr: Optional[int] = None
    review_count: Optional[int] = None
    review_rating: Optional[float] = None
    
    class Config:
        from_attributes = True

class ProductListResponse(BaseModel):
    """产品列表响应"""
    products: List[Product]
    total: int
    page: int
    page_size: int

