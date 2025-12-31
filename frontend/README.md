# MarketNiche Frontend

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

前端将在 http://localhost:5173 启动

### 3. 构建生产版本

```bash
npm run build
```

## 技术栈

- React 18
- TypeScript
- Vite
- Ant Design
- React Router
- Axios
- Recharts

## 项目结构

```
frontend/
├── src/
│   ├── pages/          # 页面组件
│   ├── components/     # 可复用组件
│   ├── services/       # API服务
│   ├── types/          # TypeScript类型
│   ├── App.tsx         # 主应用组件
│   └── main.tsx        # 入口文件
├── package.json
└── vite.config.ts
```

## 页面说明

- `/` - 首页
- `/products` - 产品数据库
- `/market` - 市场分析器
- `/asin` - ASIN查询

