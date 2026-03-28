'use client';

import { motion } from 'framer-motion';
import { Lead } from '@/lib/types';
import { StatusBadge } from '@/components/ui/StatusBadge';

interface LeadTrackerProps {
  leads: Lead[];
}

const sentimentIcons = {
  positive: (
    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  neutral: (
    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
    </svg>
  ),
  negative: (
    <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
};

export function LeadTracker({ leads }: LeadTrackerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass p-6 rounded-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Lead Tracker</h3>
        <span className="text-sm text-gray-400">{leads.length} leads</span>
      </div>

      <div className="space-y-4">
        {leads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center justify-between p-4 bg-surface/50 rounded-lg hover:bg-surface transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white font-semibold">
                  {lead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute -bottom-1 -right-1">
                  {sentimentIcons[lead.sentiment]}
                </div>
              </div>
              <div>
                <p className="font-medium text-white group-hover:text-accent transition-colors">
                  {lead.name}
                </p>
                <p className="text-sm text-gray-400">{lead.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{lead.score}</p>
                <p className="text-xs text-gray-400">Score</p>
              </div>
              <StatusBadge status={lead.status} />
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-6 py-3 rounded-lg border border-accent/30 text-accent hover:bg-accent/10 transition-colors text-sm font-medium"
      >
        View All Leads
      </motion.button>
    </motion.div>
  );
}
