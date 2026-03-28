export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  score: number;
  source: string;
  createdAt: string;
  sentiment: 'positive' | 'neutral' | 'negative';
}

export interface SentimentData {
  region: string;
  lat: number;
  lng: number;
  sentiment: number;
  count: number;
}

export interface ChartDataPoint {
  time: string;
  value: number;
  label?: string;
}

export interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}
