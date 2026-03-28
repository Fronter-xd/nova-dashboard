'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChartDataPoint } from '@/lib/types';

export function useRealTimeData(generateData: () => ChartDataPoint[], interval: number = 5000) {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  const updateData = useCallback(() => {
    setData(generateData());
    setIsConnected(true);
  }, [generateData]);

  useEffect(() => {
    updateData();
    
    const intervalId = setInterval(updateData, interval);
    
    return () => clearInterval(intervalId);
  }, [updateData, interval]);

  return { data, isConnected };
}

export function useAnimatedCounter(endValue: number, duration: number = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setValue(Math.floor(progress * endValue));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, duration]);

  return value;
}
