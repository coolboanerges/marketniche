from fastapi import APIRouter

# 创建主路由
api_router = APIRouter(prefix="/api")

# 导入子路由
from app.api import products, market

# 注册路由
api_router.include_router(products.router, tags=["products"])
api_router.include_router(market.router, tags=["market"])

