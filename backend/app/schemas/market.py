"""
市场分析相关的Pydantic模型
"""
from pydantic import BaseModel
from typing import Dict, Optional
from datetime import datetime

class MarketAnalysisResponse(BaseModel):
    """市场分析响应模型"""
    keyword: str
    market_size: int  # 预估月总销量
    total_revenue: float  # 总销售额（欧元）
    brand_concentration: float  # 品牌集中度
    seller_concentration: float  # 卖家集中度
    avg_reviews: float  # 平均Review数
    price_distribution: Dict[str, int]  # 价格分布
    trend: Optional[str] = None  # 趋势
    product_count: int  # 产品数量
    
    class Config:
        from_attributes = True

