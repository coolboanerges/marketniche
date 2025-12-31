"""
市场分析服务
"""
from sqlalchemy.orm import Session
from typing import Dict
from app.models.product import Product
from app.services.product_service import ProductService
from app.services.sales_estimator import SalesEstimator
from app.schemas.market import MarketAnalysisResponse

class MarketAnalysisService:
    """市场分析服务"""
    
    @staticmethod
    def analyze_market(db: Session, keyword: str) -> MarketAnalysisResponse:
        """
        分析市场（基于关键词）
        
        Args:
            db: 数据库会话
            keyword: 荷兰语关键词
        
        Returns:
            市场分析结果
        """
        # 获取该关键词下的所有产品
        products = ProductService.get_products_by_keyword(db, keyword)
        
        if not products:
            # 如果没有产品，返回空结果
            return MarketAnalysisResponse(
                keyword=keyword,
                market_size=0,
                total_revenue=0.0,
                brand_concentration=0.0,
                seller_concentration=0.0,
                avg_reviews=0.0,
                price_distribution={},
                product_count=0
            )
        
        # 计算市场指标
        total_sales = 0
        total_revenue = 0.0
        total_reviews = 0
        prices = []
        brands = {}
        sellers = {}
        
        for product in products:
            # 估算销量和销售额
            sales = SalesEstimator.estimate_sales(product.bsr, product.category)
            revenue = SalesEstimator.estimate_revenue(product.bsr, product.price, product.category)
            
            total_sales += sales
            total_revenue += revenue
            total_reviews += product.review_count or 0
            
            if product.price:
                prices.append(product.price)
            
            # 统计品牌和卖家（简化：假设品牌和卖家信息在title中）
            if product.brand:
                brands[product.brand] = brands.get(product.brand, 0) + revenue
        
        # 计算品牌集中度（Top 5品牌占比）
        brand_revenues = sorted(brands.values(), reverse=True)
        top5_brand_revenue = sum(brand_revenues[:5])
        brand_concentration = top5_brand_revenue / total_revenue if total_revenue > 0 else 0.0
        
        # 卖家集中度（简化：假设等于品牌集中度）
        seller_concentration = brand_concentration
        
        # 平均Review数
        avg_reviews = total_reviews / len(products) if products else 0.0
        
        # 价格分布
        price_distribution = MarketAnalysisService._calculate_price_distribution(prices)
        
        return MarketAnalysisResponse(
            keyword=keyword,
            market_size=int(total_sales),
            total_revenue=round(total_revenue, 2),
            brand_concentration=round(brand_concentration, 3),
            seller_concentration=round(seller_concentration, 3),
            avg_reviews=round(avg_reviews, 1),
            price_distribution=price_distribution,
            product_count=len(products)
        )
    
    @staticmethod
    def _calculate_price_distribution(prices: list) -> Dict[str, int]:
        """计算价格分布"""
        if not prices:
            return {}
        
        distribution = {
            "0-10": 0,
            "10-20": 0,
            "20-30": 0,
            "30-50": 0,
            "50-100": 0,
            "100+": 0
        }
        
        for price in prices:
            if price < 10:
                distribution["0-10"] += 1
            elif price < 20:
                distribution["10-20"] += 1
            elif price < 30:
                distribution["20-30"] += 1
            elif price < 50:
                distribution["30-50"] += 1
            elif price < 100:
                distribution["50-100"] += 1
            else:
                distribution["100+"] += 1
        
        # 移除为0的区间
        return {k: v for k, v in distribution.items() if v > 0}

