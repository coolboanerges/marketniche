"""
销量预估服务
MVP阶段使用简单的BSR映射表
"""
from typing import Optional

class SalesEstimator:
    """销量预估器"""
    
    # BSR到销量的简单映射表（基于经验值，后续需要校准）
    # 格式: {类目: {bsr_range: 预估月销量}}
    BSR_TO_SALES_MAP = {
        "default": {
            (1, 10): 5000,
            (11, 50): 3000,
            (51, 100): 2000,
            (101, 500): 1000,
            (501, 1000): 500,
            (1001, 5000): 200,
            (5001, 10000): 100,
            (10001, 50000): 50,
            (50001, 100000): 20,
            (100001, float('inf')): 10,
        }
    }
    
    @classmethod
    def estimate_sales(cls, bsr: Optional[int], category: Optional[str] = None) -> int:
        """
        根据BSR估算月销量
        
        Args:
            bsr: Best Seller Rank
            category: 产品类目（可选）
        
        Returns:
            预估月销量
        """
        if bsr is None:
            return 0
        
        # 使用默认映射表（后续可以根据类目使用不同的映射）
        mapping = cls.BSR_TO_SALES_MAP.get(category, cls.BSR_TO_SALES_MAP["default"])
        
        for (min_bsr, max_bsr), sales in mapping.items():
            if min_bsr <= bsr <= max_bsr:
                return sales
        
        return 0
    
    @classmethod
    def estimate_revenue(cls, bsr: Optional[int], price: Optional[float], category: Optional[str] = None) -> float:
        """
        估算月销售额
        
        Args:
            bsr: Best Seller Rank
            price: 产品价格
            category: 产品类目
        
        Returns:
            预估月销售额（欧元）
        """
        sales = cls.estimate_sales(bsr, category)
        if price is None:
            return 0.0
        return sales * price

