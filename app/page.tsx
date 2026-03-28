'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Zap, MessageCircle } from 'lucide-react';
import { Sidebar, Header } from '@/components/layout/Sidebar';
import { MetricCard } from '@/components/ui/MetricCard';
import { RealtimeChart } from '@/components/charts/RealtimeChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { LeadTracker } from '@/components/widgets/LeadTracker';
import { SentimentMap } from '@/components/widgets/SentimentMap';
import { useRealTimeData } from '@/hooks/useDashboard';
import { mockLeads, mockSentimentData, generateChartData } from '@/lib/mockData';

export default function Dashboard() {
  const { data: chartData, isConnected } = useRealTimeData(generateChartData, 5000);

  const statusDistribution = [
    { name: 'New', value: 35, color: '#3b82f6' },
    { name: 'Contacted', value: 28, color: '#f59e0b' },
    { name: 'Qualified', value: 22, color: '#8b5cf6' },
    { name: 'Converted', value: 15, color: '#22c55e' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Header />
      
      <main className="ml-20 pt-16 p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-gray-400">Real-time analytics and insights</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
              </span>
              <span className="text-sm text-gray-400">Live</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Leads"
            value="12,847"
            change={12.5}
            trend="up"
            icon={<Users className="w-6 h-6" />}
            index={0}
          />
          <MetricCard
            title="Conversion Rate"
            value="24.8%"
            change={3.2}
            trend="up"
            icon={<TrendingUp className="w-6 h-6" />}
            index={1}
          />
          <MetricCard
            title="Avg. Response Time"
            value="1.2s"
            change={-8.5}
            trend="up"
            icon={<Zap className="w-6 h-6" />}
            index={2}
          />
          <MetricCard
            title="Active Chats"
            value="156"
            change={-2.1}
            trend="down"
            icon={<MessageCircle className="w-6 h-6" />}
            index={3}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <RealtimeChart data={chartData} title="Lead Generation Trend" />
          </div>
          <div>
            <DonutChart data={statusDistribution} title="Lead Status" size={180} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LeadTracker leads={mockLeads} />
          <SentimentMap data={mockSentimentData} />
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-6 border-t border-border text-center text-gray-500 text-sm"
        >
          <p>Nova Dashboard © 2024 | Built with Next.js, D3.js, and Framer Motion</p>
        </motion.footer>
      </main>
    </div>
  );
}
