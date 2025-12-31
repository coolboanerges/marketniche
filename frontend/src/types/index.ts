// 类型定义

export interface Product {
  id: number;
  asin: string;
  title: string;
  price: number | null;
  currency: string;
  image_url: string | null;
  category: string | null;
  brand: string | null;
  seller_type: string | null;
  review_count: number;
  review_rating: number | null;
  bsr: number | null;
  first_seen_date: string;
  last_updated: string;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  page_size: number;
}

export interface MarketAnalysis {
  keyword: string;
  market_size: number;
  total_revenue: number;
  brand_concentration: number;
  seller_concentration: number;
  avg_reviews: number;
  price_distribution: Record<string, number>;
  trend: string | null;
  product_count: number;
}

export interface EstimatedSales {
  asin: string;
  estimated_monthly_sales: number;
  estimated_monthly_revenue: number;
  bsr: number | null;
  price: number | null;
}

