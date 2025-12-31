import { useState } from 'react';
import { Card, Input, Button, Row, Col, Statistic, Table, Tag, Alert } from 'antd';
import { SearchOutlined, BarChartOutlined } from '@ant-design/icons';
import { marketApi } from '../services/api';
import type { MarketAnalysis } from '../types';

function MarketAnalyzer() {
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<MarketAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!keyword.trim()) {
      setError('请输入关键词');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await marketApi.analyzeMarket(keyword);
      setAnalysis(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || '分析失败，请重试');
      setAnalysis(null);
    } finally {
      setLoading(false);
    }
  };

  const priceDistributionColumns = [
    {
      title: '价格区间',
      dataIndex: 'range',
      key: 'range',
    },
    {
      title: '产品数量',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  const priceDistributionData = analysis
    ? Object.entries(analysis.price_distribution).map(([range, count]) => ({
        range: `€${range}`,
        count,
        key: range,
      }))
    : [];

  return (
    <div className="app-container">
      <div className="page-header">
        <h1>市场分析器</h1>
        <p>输入荷兰语关键词，快速评估市场容量和竞争度</p>
      </div>

      <Card>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Input
              size="large"
              placeholder="输入荷兰语关键词，例如: koffiezetapparaat"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onPressEnter={handleAnalyze}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              size="large"
              icon={<BarChartOutlined />}
              loading={loading}
              onClick={handleAnalyze}
            >
              分析市场
            </Button>
          </Col>
        </Row>
      </Card>

      {error && (
        <Alert
          message="错误"
          description={error}
          type="error"
          showIcon
          closable
          style={{ marginTop: 16 }}
          onClose={() => setError(null)}
        />
      )}

      {analysis && (
        <>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="市场容量"
                  value={analysis.market_size}
                  suffix="件/月"
                  prefix={<BarChartOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="总销售额"
                  value={analysis.total_revenue}
                  precision={2}
                  suffix="€/月"
                  prefix="€"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="品牌集中度"
                  value={analysis.brand_concentration * 100}
                  precision={1}
                  suffix="%"
                />
                <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                  {analysis.brand_concentration > 0.5 ? (
                    <Tag color="red">竞争激烈</Tag>
                  ) : analysis.brand_concentration > 0.3 ? (
                    <Tag color="orange">中等竞争</Tag>
                  ) : (
                    <Tag color="green">竞争较小</Tag>
                  )}
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="平均Review数"
                  value={analysis.avg_reviews}
                  precision={1}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col xs={24} lg={12}>
              <Card title="价格分布">
                <Table
                  columns={priceDistributionColumns}
                  dataSource={priceDistributionData}
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="市场概况">
                <p>
                  <strong>关键词:</strong> {analysis.keyword}
                </p>
                <p>
                  <strong>产品数量:</strong> {analysis.product_count} 个
                </p>
                <p>
                  <strong>卖家集中度:</strong> {(analysis.seller_concentration * 100).toFixed(1)}%
                </p>
                {analysis.trend && (
                  <p>
                    <strong>趋势:</strong>{' '}
                    <Tag color={analysis.trend === '上升' ? 'green' : 'red'}>
                      {analysis.trend}
                    </Tag>
                  </p>
                )}
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default MarketAnalyzer;

