import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { TradeMetrics } from '../types/trade';
import { TrendingUp, TrendingDown, Target, Activity } from 'lucide-react';

interface DashboardProps {
  metrics: TradeMetrics;
}

export function Dashboard({ metrics }: DashboardProps) {
  const cards = [
    {
      title: 'Total P&L',
      value: `$${metrics.totalPnL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: metrics.totalPnL >= 0 ? TrendingUp : TrendingDown,
      color: metrics.totalPnL >= 0 ? 'text-green-500' : 'text-red-500',
    },
    {
      title: 'Win Rate',
      value: `${metrics.winRate.toFixed(1)}%`,
      icon: Target,
      color: 'text-blue-500',
    },
    {
      title: 'Total Trades',
      value: metrics.totalTrades.toString(),
      icon: Activity,
      color: 'text-purple-500',
    },
    {
      title: 'Profit Factor',
      value: metrics.profitFactor === Infinity ? '∞' : metrics.profitFactor.toFixed(2),
      icon: TrendingUp,
      color: 'text-orange-500',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className={`h-4 w-4 ${card.color}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.title === 'Total P&L' ? card.color : ''}`}>
              {card.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
