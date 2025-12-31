"""
市场分析相关API
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.market import MarketAnalysisResponse
from app.services.market_analysis_service import MarketAnalysisService

router = APIRouter()

@router.get("/market-analysis", response_model=MarketAnalysisResponse)
def analyze_market(
    keyword: str = Query(..., description="荷兰语关键词"),
    db: Session = Depends(get_db)
):
    """市场分析：根据关键词分析市场情况"""
    return MarketAnalysisService.analyze_market(db, keyword)
