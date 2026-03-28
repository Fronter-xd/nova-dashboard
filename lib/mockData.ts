import { Lead, SentimentData, ChartDataPoint } from './types';

export const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@techcorp.io',
    company: 'TechCorp',
    status: 'qualified',
    score: 92,
    source: 'LinkedIn',
    createdAt: '2024-01-15',
    sentiment: 'positive',
  },
  {
    id: '2',
    name: 'Michael Ross',
    email: 'mross@startup.co',
    company: 'Startup Inc',
    status: 'new',
    score: 78,
    source: 'Website',
    createdAt: '2024-01-14',
    sentiment: 'neutral',
  },
  {
    id: '3',
    name: 'Emily Watson',
    email: 'emily.w@enterprise.com',
    company: 'Enterprise Co',
    status: 'contacted',
    score: 85,
    source: 'Referral',
    createdAt: '2024-01-13',
    sentiment: 'positive',
  },
  {
    id: '4',
    name: 'James Miller',
    email: 'jmiller@agency.net',
    company: 'Miller Agency',
    status: 'converted',
    score: 95,
    source: 'LinkedIn',
    createdAt: '2024-01-12',
    sentiment: 'positive',
  },
  {
    id: '5',
    name: 'Lisa Park',
    email: 'lpark@growth.io',
    company: 'Growth Labs',
    status: 'new',
    score: 65,
    source: 'Website',
    createdAt: '2024-01-11',
    sentiment: 'negative',
  },
];

export const mockSentimentData: SentimentData[] = [
  { region: 'North America', lat: 40.7128, lng: -74.006, sentiment: 0.78, count: 1250 },
  { region: 'Europe', lat: 48.8566, lng: 2.3522, sentiment: 0.72, count: 890 },
  { region: 'Asia Pacific', lat: 35.6762, lng: 139.6503, sentiment: 0.65, count: 2100 },
  { region: 'South America', lat: -23.5505, lng: -46.6333, sentiment: 0.58, count: 340 },
  { region: 'Africa', lat: -33.9249, lng: 18.4241, sentiment: 0.52, count: 180 },
  { region: 'Middle East', lat: 25.2048, lng: 55.2708, sentiment: 0.48, count: 420 },
  { region: 'India', lat: 28.6139, lng: 77.209, sentiment: 0.82, count: 1850 },
  { region: 'Australia', lat: -33.8688, lng: 151.2093, sentiment: 0.71, count: 520 },
];

export function generateChartData(points: number = 24): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const now = new Date();
  
  for (let i = points - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      value: Math.floor(Math.random() * 100) + 50,
      label: `Hour ${points - i}`,
    });
  }
  return data;
}

export const mockMetrics = [
  {
    id: '1',
    title: 'Total Leads',
    value: '12,847',
    change: 12.5,
    trend: 'up' as const,
    icon: 'users',
  },
  {
    id: '2',
    title: 'Conversion Rate',
    value: '24.8%',
    change: 3.2,
    trend: 'up' as const,
    icon: 'trending-up',
  },
  {
    id: '3',
    title: 'Avg. Response Time',
    value: '1.2s',
    change: -8.5,
    trend: 'up' as const,
    icon: 'zap',
  },
  {
    id: '4',
    title: 'Active Chats',
    value: '156',
    change: -2.1,
    trend: 'down' as const,
    icon: 'message-circle',
  },
];
