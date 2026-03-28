'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Users, BarChart3, Settings, Bell, Search } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users, label: 'Leads', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-20 bg-surface border-r border-border flex flex-col items-center py-6 z-50"
    >
      <div className="mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
          <span className="text-2xl font-bold text-white">N</span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-4">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
              item.active
                ? 'bg-accent/20 text-accent'
                : 'text-gray-400 hover:bg-surface hover:text-white'
            }`}
          >
            <item.icon className="w-5 h-5" />
          </motion.button>
        ))}
      </nav>

      <div className="mt-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-400 hover:bg-surface hover:text-white transition-all"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.aside>
  );
}

export function Header() {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-20 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-border flex items-center justify-between px-6 z-40"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads, analytics..."
            className="w-80 pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-lg text-gray-400 hover:bg-background hover:text-white transition-all"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </motion.button>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">Rousan Raahat</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
            RR
          </div>
        </div>
      </div>
    </motion.header>
  );
}
