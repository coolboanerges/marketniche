# MarketNiche Backend

## 快速开始

### 1. 安装依赖

```bash
pip install -r requirements.txt
```

### 2. 初始化数据库

```bash
python init_db.py
```

这将创建数据库表并插入示例数据。

### 3. 启动服务

```bash
uvicorn app.main:app --reload
```

服务将在 http://localhost:8000 启动

### 4. 查看API文档

访问 http://localhost:8000/docs 查看Swagger API文档

## API端点

### 产品相关
- `GET /api/products` - 获取产品列表（支持筛选）
- `GET /api/products/{asin}` - 获取产品详情
- `GET /api/products/{asin}/estimated-sales` - 获取预估销量

### 市场分析
- `GET /api/market-analysis?keyword=xxx` - 市场分析

## 项目结构

```
backend/
├── app/
│   ├── main.py              # FastAPI应用入口
│   ├── config.py            # 配置
│   ├── database.py          # 数据库连接
│   ├── models/              # 数据模型
│   ├── schemas/             # Pydantic模型
│   ├── services/            # 业务逻辑
│   └── api/                 # API路由
├── init_db.py               # 数据库初始化脚本
└── requirements.txt         # 依赖列表
```

