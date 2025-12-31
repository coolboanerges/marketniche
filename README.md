# MarketNiche - 小语种市场选品专家

专注于欧洲小语种市场（荷兰、瑞典、波兰等）的亚马逊选品工具，帮助卖家快速评估市场机会，发现蓝海产品。

## 🚀 快速开始

### 后端启动

```bash
cd backend
pip install -r requirements.txt
python init_db.py
uvicorn app.main:app --reload
```

后端API将在 http://localhost:8000 启动

### 前端启动

```bash
cd frontend
npm install
npm run dev
```

前端将在 http://localhost:5173 启动

## 📋 功能特性

### MVP版本包含：

1. **产品数据库** - 浏览和筛选荷兰站产品
2. **市场分析器** - 根据关键词分析市场容量和竞争度
3. **ASIN查询** - 深入分析单个产品的运营数据
4. **销量预估** - 基于BSR的销量和销售额预估

## 🏗️ 技术栈

- **后端**: FastAPI, SQLAlchemy, SQLite
- **前端**: React, TypeScript, Ant Design, Vite
- **数据库**: SQLite (开发) → PostgreSQL (生产)

## 📚 文档

- [技术实现方案](技术实现方案.md) - 完整技术架构
- [快速启动指南](快速启动指南.md) - 快速上手指南
- [实现路径总结](实现路径总结.md) - 实现路径概览
- [MVP完成情况](MVP完成情况.md) - 完成情况总结

## 📝 API文档

启动后端后，访问 http://localhost:8000/docs 查看Swagger API文档

## ⚠️ 注意事项

- 当前为MVP版本，数据为示例数据
- 销量预估基于简单的BSR映射，后续需要优化
- 数据采集功能需要单独实现

## 🎯 下一步

1. 实现数据采集模块
2. 优化销量预估模型
3. 添加历史数据追踪
4. 实现关键词研究功能

## 📄 许可证

MIT License

---

**版本**: MVP 1.0  
**状态**: 开发中
