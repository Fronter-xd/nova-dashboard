'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';

interface DonutChartProps {
  data: { name: string; value: number; color: string }[];
  title?: string;
  size?: number;
}

export function DonutChart({ data, title, size = 200 }: DonutChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = size;
    const height = size;
    const radius = Math.min(width, height) / 2;
    const innerRadius = radius * 0.6;

    svg.attr('width', width).attr('height', height);

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const pie = d3.pie<{ name: string; value: number; color: string }>()
      .value(d => d.value)
      .sort(null);

    const arc = d3.arc<d3.PieArcDatum<{ name: string; value: number; color: string }>>()
      .innerRadius(innerRadius)
      .outerRadius(radius - 10)
      .cornerRadius(4)
      .padAngle(0.02);

    const arcs = g.selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('fill', d => d.data.color)
      .attr('opacity', 0)
      .transition()
      .delay((_, i) => i * 100)
      .duration(600)
      .attr('opacity', 1)
      .attrTween('d', function(d) {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(interpolate(t)) || '';
        };
      });

    const centerText = g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '-0.2em')
      .attr('fill', '#ffffff')
      .attr('font-size', '24px')
      .attr('font-weight', 'bold');

    const total = data.reduce((sum, d) => sum + d.value, 0);
    centerText.text(total);

    g.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .attr('fill', '#9ca3af')
      .attr('font-size', '12px')
      .text('Total');

  }, [data, size]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-6 rounded-xl"
    >
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-white text-center">{title}</h3>
      )}
      <div className="flex flex-col items-center">
        <svg ref={svgRef} />
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-400">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
