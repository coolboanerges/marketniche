import axios from 'axios';
import type { ProductListResponse, Product, MarketAnalysis, EstimatedSales } from '../types';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 产品相关API
export const productApi = {
  // 获取产品列表
  getProducts: async (params: {
    page?: number;
    page_size?: number;
    category?: string;
    min_price?: number;
    max_price?: number;
    min_sales?: number;
    search?: string;
  }): Promise<ProductListResponse> => {
    const response = await api.get<ProductListResponse>('/products', { params });
    return response.data;
  },

  // 获取产品详情
  getProduct: async (asin: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${asin}`);
    return response.data;
  },

  // 获取预估销量
  getEstimatedSales: async (asin: string): Promise<EstimatedSales> => {
    const response = await api.get<EstimatedSales>(`/products/${asin}/estimated-sales`);
    return response.data;
  },
};

// 市场分析API
export const marketApi = {
  // 市场分析
  analyzeMarket: async (keyword: string): Promise<MarketAnalysis> => {
    const response = await api.get<MarketAnalysis>('/market-analysis', {
      params: { keyword },
    });
    return response.data;
  },
};

export default api;

