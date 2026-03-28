'use client';

import { motion } from 'framer-motion';

interface StatusBadgeProps {
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  className?: string;
}

const statusConfig = {
  new: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    label: 'New',
  },
  contacted: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    border: 'border-yellow-500/30',
    label: 'Contacted',
  },
  qualified: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    label: 'Qualified',
  },
  converted: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    border: 'border-green-500/30',
    label: 'Converted',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {config.label}
    </motion.span>
  );
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}
