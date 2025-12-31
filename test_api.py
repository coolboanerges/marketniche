"""
快速测试API是否正常工作
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_api():
    """测试API端点"""
    print("🧪 开始测试MarketNiche API...\n")
    
    # 测试1: 健康检查
    print("1. 测试健康检查...")
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=5)
        if response.status_code == 200:
            print("   ✅ 健康检查通过")
        else:
            print(f"   ❌ 健康检查失败: {response.status_code}")
            return
    except Exception as e:
        print(f"   ❌ 无法连接到后端: {e}")
        print("   💡 请确保后端服务已启动 (uvicorn app.main:app --reload)")
        return
    
    # 测试2: 获取产品列表
    print("\n2. 测试获取产品列表...")
    try:
        response = requests.get(f"{BASE_URL}/api/products", params={"page": 1, "page_size": 5})
        if response.status_code == 200:
            data = response.json()
            print(f"   ✅ 成功获取 {len(data['products'])} 个产品")
            if data['products']:
                print(f"   📦 示例产品: {data['products'][0]['title'][:50]}...")
        else:
            print(f"   ❌ 获取产品列表失败: {response.status_code}")
    except Exception as e:
        print(f"   ❌ 错误: {e}")
    
    # 测试3: 获取产品详情
    print("\n3. 测试获取产品详情...")
    try:
        asin = "B08XYZ1234"
        response = requests.get(f"{BASE_URL}/api/products/{asin}")
        if response.status_code == 200:
            product = response.json()
            print(f"   ✅ 成功获取产品: {product['title'][:50]}...")
        else:
            print(f"   ⚠️  产品 {asin} 不存在（这是正常的，如果数据库未初始化）")
    except Exception as e:
        print(f"   ❌ 错误: {e}")
    
    # 测试4: 市场分析
    print("\n4. 测试市场分析...")
    try:
        keyword = "koffiezetapparaat"
        response = requests.get(f"{BASE_URL}/api/market-analysis", params={"keyword": keyword})
        if response.status_code == 200:
            analysis = response.json()
            print(f"   ✅ 市场分析成功")
            print(f"   📊 市场容量: {analysis['market_size']} 件/月")
            print(f"   💰 总销售额: €{analysis['total_revenue']:.2f}/月")
        else:
            print(f"   ⚠️  市场分析返回: {response.status_code}")
    except Exception as e:
        print(f"   ❌ 错误: {e}")
    
    # 测试5: 预估销量
    print("\n5. 测试预估销量...")
    try:
        asin = "B08XYZ1234"
        response = requests.get(f"{BASE_URL}/api/products/{asin}/estimated-sales")
        if response.status_code == 200:
            sales = response.json()
            print(f"   ✅ 预估销量成功")
            print(f"   📈 预估月销量: {sales['estimated_monthly_sales']} 件")
            print(f"   💵 预估月销售额: €{sales['estimated_monthly_revenue']:.2f}")
        else:
            print(f"   ⚠️  预估销量返回: {response.status_code}")
    except Exception as e:
        print(f"   ❌ 错误: {e}")
    
    print("\n✨ 测试完成！")
    print("\n💡 提示:")
    print("   - 如果某些测试失败，请先运行: python backend/init_db.py")
    print("   - 查看完整API文档: http://localhost:8000/docs")

if __name__ == "__main__":
    test_api()

