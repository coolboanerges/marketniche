import { useState, useEffect } from 'react';
import { Card, Table, Input, Select, Row, Col, Button, Tag, Space, Image } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { productApi } from '../services/api';
import type { Product, ProductListResponse } from '../types';

const { Search } = Input;
const { Option } = Select;

function ProductDatabase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [filters, setFilters] = useState({
    category: undefined as string | undefined,
    min_price: undefined as number | undefined,
    max_price: undefined as number | undefined,
    search: undefined as string | undefined,
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data: ProductListResponse = await productApi.getProducts({
        page,
        page_size: pageSize,
        ...filters,
      });
      setProducts(data.products);
      setTotal(data.total);
    } catch (error) {
      console.error('获取产品失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize, filters]);

  const handleSearch = (value: string) => {
    setFilters({ ...filters, search: value || undefined });
    setPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setFilters({ ...filters, category: value || undefined });
    setPage(1);
  };

  const columns = [
    {
      title: '图片',
      dataIndex: 'image_url',
      key: 'image',
      width: 100,
      render: (url: string | null) => (
        <Image
          width={80}
          height={80}
          src={url || 'https://via.placeholder.com/80'}
          alt="产品图片"
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'ASIN',
      dataIndex: 'asin',
      key: 'asin',
      width: 120,
      render: (asin: string) => <code>{asin}</code>,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      render: (price: number | null, record: Product) =>
        price ? `${record.currency} ${price.toFixed(2)}` : '-',
    },
    {
      title: '类目',
      dataIndex: 'category',
      key: 'category',
      width: 150,
    },
    {
      title: 'Review',
      dataIndex: 'review_count',
      key: 'review_count',
      width: 100,
      render: (count: number, record: Product) => (
        <div>
          <div>{count}</div>
          {record.review_rating && (
            <div style={{ fontSize: '12px', color: '#666' }}>
              ⭐ {record.review_rating.toFixed(1)}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'BSR',
      dataIndex: 'bsr',
      key: 'bsr',
      width: 100,
      render: (bsr: number | null) => (bsr ? `#${bsr}` : '-'),
    },
    {
      title: '卖家类型',
      dataIndex: 'seller_type',
      key: 'seller_type',
      width: 100,
      render: (type: string | null) =>
        type ? (
          <Tag color={type === 'FBA' ? 'blue' : 'green'}>{type}</Tag>
        ) : (
          '-'
        ),
    },
  ];

  return (
    <div className="app-container">
      <div className="page-header">
        <h1>产品数据库</h1>
        <p>浏览和筛选荷兰站产品，发现潜在机会</p>
      </div>

      <Card>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          <Row gutter={16}>
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="搜索产品标题或ASIN"
                allowClear
                enterButton={<SearchOutlined />}
                onSearch={handleSearch}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                placeholder="选择类目"
                allowClear
                style={{ width: '100%' }}
                onChange={handleCategoryChange}
              >
                <Option value="Keuken & Huishouden">Keuken & Huishouden</Option>
                <Option value="Elektronica">Elektronica</Option>
                <Option value="Sport & Outdoor">Sport & Outdoor</Option>
                <Option value="Kantoor & Thuis">Kantoor & Thuis</Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Button icon={<ReloadOutlined />} onClick={fetchProducts}>
                刷新
              </Button>
            </Col>
          </Row>
        </Space>
      </Card>

      <Card style={{ marginTop: 16 }}>
        <Table
          columns={columns}
          dataSource={products}
          loading={loading}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`,
            onChange: (page, size) => {
              setPage(page);
              setPageSize(size);
            },
          }}
        />
      </Card>
    </div>
  );
}

export default ProductDatabase;

