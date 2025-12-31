"""
产品服务层
"""
from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from typing import Optional, List
from app.models.product import Product
from app.schemas.product import ProductCreate
from app.services.sales_estimator import SalesEstimator

class ProductService:
    """产品服务"""
    
    @staticmethod
    def get_product(db: Session, asin: str) -> Optional[Product]:
        """根据ASIN获取产品"""
        return db.query(Product).filter(Product.asin == asin).first()
    
    @staticmethod
    def get_products(
        db: Session,
        skip: int = 0,
        limit: int = 20,
        category: Optional[str] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        min_sales: Optional[int] = None,
        search: Optional[str] = None
    ) -> tuple[List[Product], int]:
        """
        获取产品列表（支持筛选）
        
        Returns:
            (产品列表, 总数)
        """
        query = db.query(Product)
        
        # 类目筛选
        if category:
            query = query.filter(Product.category.contains(category))
        
        # 价格筛选
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        
        # 搜索（标题或ASIN）
        if search:
            query = query.filter(
                or_(
                    Product.title.contains(search),
                    Product.asin.contains(search)
                )
            )
        
        # 获取总数
        total = query.count()
        
        # 分页
        products = query.offset(skip).limit(limit).all()
        
        # 如果设置了最小销量筛选，需要计算销量后过滤
        if min_sales is not None:
            filtered_products = []
            for product in products:
                estimated_sales = SalesEstimator.estimate_sales(product.bsr, product.category)
                if estimated_sales >= min_sales:
                    filtered_products.append(product)
            products = filtered_products
        
        return products, total
    
    @staticmethod
    def create_product(db: Session, product_data: ProductCreate) -> Product:
        """创建产品"""
        db_product = Product(**product_data.dict())
        db.add(db_product)
        db.commit()
        db.refresh(db_product)
        return db_product
    
    @staticmethod
    def get_products_by_keyword(db: Session, keyword: str) -> List[Product]:
        """根据关键词获取相关产品（简单实现：在标题中搜索）"""
        return db.query(Product).filter(Product.title.contains(keyword)).all()

