"""
产品相关API
"""
from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import Optional
from app.database import get_db
from app.schemas.product import Product, ProductListResponse
from app.services.product_service import ProductService
from app.services.sales_estimator import SalesEstimator

router = APIRouter()

@router.get("/products", response_model=ProductListResponse)
def get_products(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    category: Optional[str] = None,
    min_price: Optional[float] = Query(None, ge=0),
    max_price: Optional[float] = Query(None, ge=0),
    min_sales: Optional[int] = Query(None, ge=0),
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """获取产品列表（支持筛选和分页）"""
    skip = (page - 1) * page_size
    products, total = ProductService.get_products(
        db=db,
        skip=skip,
        limit=page_size,
        category=category,
        min_price=min_price,
        max_price=max_price,
        min_sales=min_sales,
        search=search
    )
    
    return ProductListResponse(
        products=products,
        total=total,
        page=page,
        page_size=page_size
    )

@router.get("/products/{asin}", response_model=Product)
def get_product(asin: str, db: Session = Depends(get_db)):
    """根据ASIN获取产品详情"""
    product = ProductService.get_product(db, asin)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.get("/products/{asin}/estimated-sales")
def get_estimated_sales(asin: str, db: Session = Depends(get_db)):
    """获取产品的预估销量"""
    product = ProductService.get_product(db, asin)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    estimated_sales = SalesEstimator.estimate_sales(product.bsr, product.category)
    estimated_revenue = SalesEstimator.estimate_revenue(product.bsr, product.price, product.category)
    
    return {
        "asin": asin,
        "estimated_monthly_sales": estimated_sales,
        "estimated_monthly_revenue": round(estimated_revenue, 2),
        "bsr": product.bsr,
        "price": product.price
    }
