"""
应用配置
"""
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # 数据库配置
    database_url: str = "sqlite:///./marketniche.db"
    
    # API配置
    api_title: str = "MarketNiche API"
    api_version: str = "1.0.0"
    
    # CORS配置
    cors_origins: list = ["http://localhost:5173", "http://localhost:3000"]
    
    class Config:
        env_file = ".env"

settings = Settings()

