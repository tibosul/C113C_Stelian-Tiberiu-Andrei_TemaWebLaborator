export interface HealthResponse {
  status: string;
}

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface PortfolioPosition {
  symbol: string;
  quantity: number;
  avgCost: number;
  currentPrice: number;
}
