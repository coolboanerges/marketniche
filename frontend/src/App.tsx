import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, DatabaseOutlined, BarChartOutlined, SearchOutlined } from '@ant-design/icons';
import ProductDatabase from './pages/ProductDatabase';
import MarketAnalyzer from './pages/MarketAnalyzer';
import ASINInspector from './pages/ASINInspector';
import Home from './pages/Home';
import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">首页</Link>,
    },
    {
      key: '/products',
      icon: <DatabaseOutlined />,
      label: <Link to="/products">产品数据库</Link>,
    },
    {
      key: '/market',
      icon: <BarChartOutlined />,
      label: <Link to="/market">市场分析器</Link>,
    },
    {
      key: '/asin',
      icon: <SearchOutlined />,
      label: <Link to="/asin">ASIN查询</Link>,
    },
  ];

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ display: 'flex', alignItems: 'center', background: '#001529' }}>
          <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginRight: '40px' }}>
            MarketNiche
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/']}
            items={menuItems}
            style={{ flex: 1, minWidth: 0 }}
          />
        </Header>
        <Content style={{ padding: '24px', background: '#f0f2f5' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductDatabase />} />
            <Route path="/market" element={<MarketAnalyzer />} />
            <Route path="/asin" element={<ASINInspector />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          MarketNiche ©2024 - 小语种市场选品专家
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;

