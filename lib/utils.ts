import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getSentimentColor(sentiment: number): string {
  if (sentiment > 0.6) return '#22c55e';
  if (sentiment > 0.4) return '#f59e0b';
  return '#ef4444';
}
