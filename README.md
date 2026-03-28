# Nova Dashboard

**High-performance analytics dashboard with real-time data visualization, lead tracking, and sentiment analysis.**

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![React](https://img.shields.io/badge/React-18-blue) ![D3.js](https://img.shields.io/badge/D3.js-v7-orange) ![Framer Motion](https://img.shields.io/badge/Framer-Motion-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-cyan)

## ⚡ Features That Convert

### 🎯 Real-Time Analytics Dashboard
- **Live Data Updates** - Data refreshes every 5 seconds with smooth animations
- **Interactive Charts** - D3.js-powered visualizations with hover tooltips
- **Responsive Grid** - Works perfectly on desktop, tablet, and mobile

### 📊 Lead Tracker Widget
- **Visual Lead Status** - Color-coded badges for New, Contacted, Qualified, Converted
- **Sentiment Indicators** - Quick visual feedback on lead sentiment
- **Score Tracking** - Lead quality scores prominently displayed
- **Company Details** - Full lead context at a glance

### 🗺️ Global Sentiment Map
- **Interactive Globe Visualization** - D3.js geo projection with animated markers
- **Regional Sentiment Analysis** - Color-coded by positive/neutral/negative
- **Bubble Size Scaling** - Mentions proportional to regional impact
- **Hover Tooltips** - Detailed statistics on interaction

### ✨ Premium Animations
- **Staggered Reveals** - Elements animate in sequence for polished feel
- **Micro-interactions** - Hover effects, scale transforms, and smooth transitions
- **Glassmorphism UI** - Modern translucent design elements
- **Gradient Accents** - Purple-themed branding for premium appearance

## 🚀 Performance Highlights

| Feature | Benefit |
|---------|---------|
| Server-Side Rendering | SEO-friendly, fast initial load |
| Optimized D3 Charts | 60fps animations without jank |
| Framer Motion | Hardware-accelerated transforms |
| Tailwind CSS | Zero runtime overhead |
| Real-time Updates | WebSocket-ready architecture |

## 🎨 Design System

- **Dark Theme** - Professional dark UI optimized for extended use
- **Purple Accents** - Eye-catching brand color throughout
- **Glass Effects** - Translucent cards with blur backdrop
- **Custom Scrollbars** - Styled to match the design

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 14 (App Router) |
| UI Library | React 18 |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Charts | D3.js v7 |
| Icons | Lucide React |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Fronter-xd/nova-dashboard.git
cd nova-dashboard

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
nova-dashboard/
├── app/
│   ├── page.tsx           # Main dashboard page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── charts/
│   │   ├── RealtimeChart.tsx  # D3.js real-time line chart
│   │   └── DonutChart.tsx     # D3.js donut chart
│   ├── widgets/
│   │   ├── LeadTracker.tsx     # Lead tracking widget
│   │   └── SentimentMap.tsx   # Global sentiment map
│   ├── layout/
│   │   └── Sidebar.tsx        # Navigation sidebar
│   └── ui/
│       ├── MetricCard.tsx      # Metric display card
│       └── StatusBadge.tsx     # Status indicator
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── utils.ts           # Utility functions
│   └── mockData.ts        # Sample data
└── hooks/
    └── useDashboard.ts    # Custom React hooks
```

## Components Overview

### MetricCard
Displays key metrics with animated counters and trend indicators.

```tsx
<MetricCard
  title="Total Leads"
  value="12,847"
  change={12.5}
  trend="up"
  icon={<Users />}
/>
```

### LeadTracker
Shows recent leads with status, score, and sentiment.

### SentimentMap
Interactive world map with regional sentiment visualization.

### RealtimeChart
Live-updating line chart with D3.js animations.

### DonutChart
Animated donut chart for status distribution.

## Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  accent: {
    DEFAULT: '#8b5cf6',  // Change primary color
    light: '#a78bfa',
    dark: '#7c3aed',
  }
}
```

### Data Source
Replace mock data in `lib/mockData.ts` with your API calls:

```typescript
const response = await fetch('/api/leads');
const data = await response.json();
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use for personal or commercial projects.

---

**Built with ❤️ by [Rousan Raahat](https://github.com/Fronter-xd)**
