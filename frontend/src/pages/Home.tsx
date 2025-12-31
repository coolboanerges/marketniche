import { Card, Row, Col, Statistic, Typography } from 'antd';
import { DatabaseOutlined, BarChartOutlined, SearchOutlined, RocketOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Home.css';

const { Title, Paragraph } = Typography;

function Home() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <Title level={1}>MarketNiche</Title>
        <Title level={3} type="secondary">小语种市场选品专家</Title>
        <Paragraph style={{ fontSize: '16px', marginTop: '20px', maxWidth: '800px' }}>
          专注于欧洲小语种市场（荷兰、瑞典、波兰等）的亚马逊选品工具，
          帮助卖家快速评估市场机会，发现蓝海产品。
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} style={{ marginTop: '40px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Link to="/products">
            <Card hoverable className="feature-card">
              <DatabaseOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
              <Title level={4}>产品数据库</Title>
              <Paragraph>浏览和筛选荷兰站产品，发现潜在机会</Paragraph>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Link to="/market">
            <Card hoverable className="feature-card">
              <BarChartOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
              <Title level={4}>市场分析器</Title>
              <Paragraph>输入关键词，快速评估市场容量和竞争度</Paragraph>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Link to="/asin">
            <Card hoverable className="feature-card">
              <SearchOutlined style={{ fontSize: '48px', color: '#faad14', marginBottom: '16px' }} />
              <Title level={4}>ASIN查询</Title>
              <Paragraph>深入分析单个产品的销售趋势和运营数据</Paragraph>
            </Card>
          </Link>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <Card className="feature-card">
            <RocketOutlined style={{ fontSize: '48px', color: '#722ed1', marginBottom: '16px' }} />
            <Title level={4}>关键词研究</Title>
            <Paragraph>获取本土化关键词，优化Listing和广告</Paragraph>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '40px' }}>
        <Title level={3}>核心功能</Title>
        <Row gutter={[24, 24]} style={{ marginTop: '20px' }}>
          <Col xs={24} md={12}>
            <Title level={5}>📊 市场容量估算</Title>
            <Paragraph>预估关键词下的月总搜索量和总销售额</Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>🏆 竞争分析</Title>
            <Paragraph>分析品牌集中度、卖家集中度和Review门槛</Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>💰 价格分布</Title>
            <Paragraph>了解主要产品的价格分布区间</Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Title level={5}>📈 趋势指标</Title>
            <Paragraph>显示市场过去6个月的搜索量趋势</Paragraph>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Home;

