'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { ChartDataPoint } from '@/lib/types';

interface RealtimeChartProps {
  data: ChartDataPoint[];
  title?: string;
}

export function RealtimeChart({ data, title }: RealtimeChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const containerWidth = containerRef.current.clientWidth;
    const width = Math.max(containerWidth, 400);
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr('width', width).attr('height', height);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scalePoint()
      .domain(data.map(d => d.time))
      .range([0, innerWidth])
      .padding(0.5);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number * 1.1])
      .range([innerHeight, 0]);

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(x).tickValues(x.domain().filter((_, i) => i % 4 === 0)))
      .attr('color', '#4b5563')
      .selectAll('text')
      .attr('fill', '#9ca3af')
      .style('font-size', '10px');

    g.append('g')
      .call(d3.axisLeft(y).ticks(5))
      .attr('color', '#4b5563')
      .selectAll('text')
      .attr('fill', '#9ca3af')
      .style('font-size', '10px');

    const area = d3.area<ChartDataPoint>()
      .x(d => x(d.time) as number)
      .y0(innerHeight)
      .y1(d => y(d.value))
      .curve(d3.curveMonotoneX);

    const line = d3.line<ChartDataPoint>()
      .x(d => x(d.time) as number)
      .y(d => y(d.value))
      .curve(d3.curveMonotoneX);

    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'areaGradient')
      .attr('x1', '0%').attr('y1', '0%')
      .attr('x2', '0%').attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#8b5cf6')
      .attr('stop-opacity', 0.4);

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#8b5cf6')
      .attr('stop-opacity', 0);

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#areaGradient)')
      .attr('d', area)
      .attr('opacity', 0)
      .transition()
      .duration(800)
      .attr('opacity', 1);

    const path = g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#8b5cf6')
      .attr('stroke-width', 2)
      .attr('d', line);

    const totalLength = path.node()?.getTotalLength() || 0;
    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1500)
      .ease(d3.easeQuadOut)
      .attr('stroke-dashoffset', 0);

    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', d => x(d.time) as number)
      .attr('cy', d => y(d.value))
      .attr('r', 0)
      .attr('fill', '#8b5cf6')
      .attr('stroke', '#1a1a24')
      .attr('stroke-width', 2)
      .transition()
      .delay((_, i) => 1500 + i * 50)
      .duration(300)
      .attr('r', 4);

  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 rounded-xl"
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
      )}
      <div ref={containerRef} className="w-full">
        <svg ref={svgRef} className="w-full" />
      </div>
    </motion.div>
  );
}
