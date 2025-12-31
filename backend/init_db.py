"""
初始化数据库并创建示例数据
"""
from app.database import engine, Base, SessionLocal
from app.models import Product, Keyword
from app.services.product_service import ProductService
from app.schemas.product import ProductCreate
from datetime import datetime

def init_db():
    """创建数据库表"""
    Base.metadata.create_all(bind=engine)
    print("✅ 数据库表创建成功")

def create_sample_data():
    """创建示例数据（用于测试）"""
    db = SessionLocal()
    try:
        # 示例产品数据（荷兰站）
        sample_products = [
            {
                "asin": "B08XYZ1234",
                "title": "Koffiezetapparaat Automatisch - Espresso Machine",
                "price": 89.99,
                "currency": "EUR",
                "image_url": "https://example.com/coffee.jpg",
                "category": "Keuken & Huishouden",
                "brand": "CoffeeBrand",
                "seller_type": "FBA",
                "review_count": 1250,
                "review_rating": 4.5,
                "bsr": 45
            },
            {
                "asin": "B09ABC5678",
                "title": "Draadloze Koptelefoon - Noise Cancelling",
                "price": 129.99,
                "currency": "EUR",
                "image_url": "https://example.com/headphone.jpg",
                "category": "Elektronica",
                "brand": "AudioTech",
                "seller_type": "FBA",
                "review_count": 890,
                "review_rating": 4.7,
                "bsr": 120
            },
            {
                "asin": "B10DEF9012",
                "title": "Yoga Mat Premium - Antislip",
                "price": 24.99,
                "currency": "EUR",
                "image_url": "https://example.com/yoga.jpg",
                "category": "Sport & Outdoor",
                "brand": "FitLife",
                "seller_type": "FBM",
                "review_count": 450,
                "review_rating": 4.3,
                "bsr": 350
            },
            {
                "asin": "B11GHI3456",
                "title": "Waterfles Roestvrij Staal - 1 Liter",
                "price": 19.99,
                "currency": "EUR",
                "image_url": "https://example.com/bottle.jpg",
                "category": "Sport & Outdoor",
                "brand": "EcoBottle",
                "seller_type": "FBA",
                "review_count": 320,
                "review_rating": 4.6,
                "bsr": 280
            },
            {
                "asin": "B12JKL7890",
                "title": "Staande Bureau Lamp - LED Dimbaar",
                "price": 49.99,
                "currency": "EUR",
                "image_url": "https://example.com/lamp.jpg",
                "category": "Kantoor & Thuis",
                "brand": "LightWorks",
                "seller_type": "FBA",
                "review_count": 680,
                "review_rating": 4.4,
                "bsr": 180
            }
        ]
        
        # 检查是否已有数据
        existing = db.query(Product).first()
        if existing:
            print("ℹ️  数据库已有数据，跳过示例数据创建")
            return
        
        # 创建产品
        for product_data in sample_products:
            product = ProductCreate(**product_data)
            ProductService.create_product(db, product)
        
        print(f"✅ 成功创建 {len(sample_products)} 个示例产品")
        
    except Exception as e:
        print(f"❌ 创建示例数据失败: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 初始化数据库...")
    init_db()
    print("📦 创建示例数据...")
    create_sample_data()
    print("✨ 完成！")

