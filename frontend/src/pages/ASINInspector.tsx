import { useState } from 'react';
import { Card, Input, Button, Row, Col, Descriptions, Tag, Alert, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { productApi } from '../services/api';
import type { Product, EstimatedSales } from '../types';

function ASINInspector() {
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [sales, setSales] = useState<EstimatedSales | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!asin.trim()) {
      setError('请输入ASIN');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [productData, salesData] = await Promise.all([
        productApi.getProduct(asin),
        productApi.getEstimatedSales(asin),
      ]);
      setProduct(productData);
      setSales(salesData);
    } catch (err: any) {
      setError(err.response?.data?.detail || '查询失败，请重试');
      setProduct(null);
      setSales(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="page-header">
        <h1>ASIN深度查询</h1>
        <p>输入荷兰站ASIN，获取产品的详细运营数据</p>
      </div>

      <Card>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Input
              size="large"
              placeholder="输入ASIN，例如: B08XYZ1234"
              value={asin}
              onChange={(e) => setAsin(e.target.value.toUpperCase())}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined />}
            />
          </Col>
          <Col>
            <Button type="primary" size="large" loading={loading} onClick={handleSearch}>
              查询
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

      {loading && (
        <Card style={{ marginTop: 16, textAlign: 'center' }}>
          <Spin size="large" />
        </Card>
      )}

      {product && (
        <>
          <Card title="产品基本信息" style={{ marginTop: 16 }}>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="ASIN">{product.asin}</Descriptions.Item>
              <Descriptions.Item label="标题" span={2}>
                {product.title}
              </Descriptions.Item>
              <Descriptions.Item label="价格">
                {product.price
                  ? `${product.currency} ${product.price.toFixed(2)}`
                  : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="类目">{product.category || '-'}</Descriptions.Item>
              <Descriptions.Item label="品牌">{product.brand || '-'}</Descriptions.Item>
              <Descriptions.Item label="卖家类型">
                {product.seller_type ? (
                  <Tag color={product.seller_type === 'FBA' ? 'blue' : 'green'}>
                    {product.seller_type}
                  </Tag>
                ) : (
                  '-'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Review数量">{product.review_count}</Descriptions.Item>
              <Descriptions.Item label="Review评分">
                {product.review_rating ? `⭐ ${product.review_rating.toFixed(1)}` : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="BSR排名">
                {product.bsr ? `#${product.bsr}` : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="首次发现">
                {new Date(product.first_seen_date).toLocaleDateString('zh-CN')}
              </Descriptions.Item>
              <Descriptions.Item label="最后更新">
                {new Date(product.last_updated).toLocaleDateString('zh-CN')}
              </Descriptions.Item>
            </Descriptions>
          </Card>

          {sales && (
            <Card title="预估销售数据" style={{ marginTop: 16 }}>
              <Row gutter={16}>
                <Col xs={24} sm={12} lg={8}>
                  <Card>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                        {sales.estimated_monthly_sales}
                      </div>
                      <div style={{ color: '#666', marginTop: '8px' }}>预估月销量</div>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Card>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                        €{sales.estimated_monthly_revenue.toFixed(2)}
                      </div>
                      <div style={{ color: '#666', marginTop: '8px' }}>预估月销售额</div>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={12} lg={8}>
                  <Card>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#faad14' }}>
                        {sales.bsr ? `#${sales.bsr}` : '-'}
                      </div>
                      <div style={{ color: '#666', marginTop: '8px' }}>当前BSR排名</div>
                    </div>
                  </Card>
                </Col>
              </Row>
              <Alert
                message="注意"
                description="销量和销售额为基于BSR的预估数据，仅供参考。实际数据可能有所差异。"
                type="info"
                showIcon
                style={{ marginTop: 16 }}
              />
            </Card>
          )}
        </>
      )}
    </div>
  );
}

export default ASINInspector;

