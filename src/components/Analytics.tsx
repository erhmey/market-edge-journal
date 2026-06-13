import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Trade, TradeMetrics } from '../types/trade';

interface AnalyticsProps {
  metrics: TradeMetrics;
  trades: Trade[];
}

export function Analytics({ metrics, trades }: AnalyticsProps) {
  // Strategy performance data
  const strategyData = React.useMemo(() => {
    const closedTrades = trades.filter(t => t.status === 'Closed' && t.pnl !== undefined);
    const strategies: Record<string, number> = {};
    
    closedTrades.forEach(t => {
      const name = t.strategy || 'Unknown';
      strategies[name] = (strategies[name] || 0) + (t.pnl || 0);
    });

    return Object.entries(strategies).map(([name, pnl]) => ({
      name,
      pnl
    })).sort((a, b) => b.pnl - a.pnl);
  }, [trades]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Equity Curve</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.equityCurve}>
              <defs>
                <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.62 0.19 260)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="oklch(0.62 0.19 260)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.922 0 0)" />
              <XAxis 
                dataKey="date" 
                stroke="oklch(0.556 0 0)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="oklch(0.556 0 0)" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'oklch(1 0 0)', 
                  border: '1px solid oklch(0.922 0 0)',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="equity" 
                stroke="oklch(0.62 0.19 260)" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorEquity)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategy Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {strategyData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={strategyData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="oklch(0.922 0 0)" />
                <XAxis 
                  type="number"
                  stroke="oklch(0.556 0 0)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  stroke="oklch(0.556 0 0)" 
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  width={100}
                />
                <Tooltip 
                   contentStyle={{ 
                    backgroundColor: 'oklch(1 0 0)', 
                    border: '1px solid oklch(0.922 0 0)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="pnl" radius={[0, 4, 4, 0]}>
                  {strategyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Add some closed trades to see strategy analysis
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
