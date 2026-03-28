'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { SentimentData } from '@/lib/types';

interface SentimentMapProps {
  data: SentimentData[];
}

export function SentimentMap({ data }: SentimentMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const containerWidth = containerRef.current.clientWidth;
    const width = Math.max(containerWidth, 400);
    const height = 300;

    svg.attr('width', width).attr('height', height);

    const projection = d3.geoNaturalEarth1()
      .scale(width / 5)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', '#121218');

    const graticule = d3.geoGraticule();
    svg.append('path')
      .datum(graticule())
      .attr('fill', 'none')
      .attr('stroke', '#2a2a3a')
      .attr('stroke-width', 0.5)
      .attr('d', path);

    const colorScale = d3.scaleLinear<string>()
      .domain([0, 0.5, 1])
      .range(['#ef4444', '#f59e0b', '#22c55e']);

    const maxCount = d3.max(data, d => d.count) || 1;
    const radiusScale = d3.scaleSqrt()
      .domain([0, maxCount])
      .range([4, 20]);

    data.forEach((d, i) => {
      const coords = projection([d.lng, d.lat]);
      if (!coords) return;

      const [x, y] = coords;

      const g = svg.append('g')
        .attr('transform', `translate(${x},${y})`)
        .style('cursor', 'pointer');

      g.append('circle')
        .attr('r', 0)
        .attr('fill', colorScale(d.sentiment))
        .attr('fill-opacity', 0.7)
        .attr('stroke', colorScale(d.sentiment))
        .attr('stroke-width', 2)
        .attr('stroke-opacity', 0.8)
        .transition()
        .delay(i * 100)
        .duration(500)
        .attr('r', radiusScale(d.count));

      g.append('circle')
        .attr('r', radiusScale(d.count) + 5)
        .attr('fill', 'none')
        .attr('stroke', colorScale(d.sentiment))
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.3)
        .style('opacity', 0)
        .transition()
        .delay(i * 100 + 500)
        .duration(500)
        .style('opacity', 1)
        .attr('r', radiusScale(d.count) + 10);

      g.append('title')
        .text(`${d.region}: ${(d.sentiment * 100).toFixed(0)}% positive (${d.count} mentions)`);

      const tooltip = g.append('g')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .style('pointer-events', 'none');

      tooltip.append('rect')
        .attr('x', -50)
        .attr('y', -45)
        .attr('width', 100)
        .attr('height', 40)
        .attr('rx', 4)
        .attr('fill', '#1a1a24')
        .attr('stroke', '#2a2a3a');

      tooltip.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -30)
        .attr('fill', '#ffffff')
        .attr('font-size', '10px')
        .text(d.region);

      tooltip.append('text')
        .attr('text-anchor', 'middle')
        .attr('y', -18)
        .attr('fill', '#9ca3af')
        .attr('font-size', '9px')
        .text(`${(d.sentiment * 100).toFixed(0)}% positive`);

      g.on('mouseenter', function() {
        d3.select(this).select('circle:nth-child(1)')
          .transition()
          .duration(200)
          .attr('r', radiusScale(d.count) * 1.3);
        
        tooltip.transition()
          .duration(200)
          .style('opacity', 1);
      })
      .on('mouseleave', function() {
        d3.select(this).select('circle:nth-child(1)')
          .transition()
          .duration(200)
          .attr('r', radiusScale(d.count));
        
        tooltip.transition()
          .duration(200)
          .style('opacity', 0);
      });
    });

    const legendWidth = 120;
    const legendHeight = 10;
    const legendX = width - legendWidth - 20;
    const legendY = height - 40;

    const legendGradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'legendGradient');

    legendGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#ef4444');
    legendGradient.append('stop')
      .attr('offset', '50%')
      .attr('stop-color', '#f59e0b');
    legendGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#22c55e');

    svg.append('rect')
      .attr('x', legendX)
      .attr('y', legendY)
      .attr('width', legendWidth)
      .attr('height', legendHeight)
      .attr('rx', 2)
      .attr('fill', 'url(#legendGradient)');

    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY - 5)
      .attr('fill', '#9ca3af')
      .attr('font-size', '10px')
      .text('Sentiment');

    svg.append('text')
      .attr('x', legendX)
      .attr('y', legendY + legendHeight + 12)
      .attr('fill', '#ef4444')
      .attr('font-size', '9px')
      .text('Negative');

    svg.append('text')
      .attr('x', legendX + legendWidth)
      .attr('y', legendY + legendHeight + 12)
      .attr('text-anchor', 'end')
      .attr('fill', '#22c55e')
      .attr('font-size', '9px')
      .text('Positive');

  }, [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass p-6 rounded-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Global Sentiment Map</h3>
        <span className="text-sm text-gray-400">Real-time</span>
      </div>
      <div ref={containerRef} className="w-full rounded-lg overflow-hidden">
        <svg ref={svgRef} className="w-full" />
      </div>
    </motion.div>
  );
}
