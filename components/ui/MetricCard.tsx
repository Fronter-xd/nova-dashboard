'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  index?: number;
}

export function MetricCard({ title, value, change, trend, icon, index = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass p-6 rounded-xl relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-accent/10 text-accent">
            {icon}
          </div>
          <div className={cn(
            'flex items-center gap-1 text-sm font-medium',
            trend === 'up' && 'text-success',
            trend === 'down' && 'text-error',
            trend === 'neutral' && 'text-warning'
          )}>
            <span>{trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}</span>
            <span>{Math.abs(change)}%</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-accent"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
      />
    </motion.div>
  );
}
