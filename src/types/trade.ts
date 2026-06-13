export type TradeSide = 'Long' | 'Short';
export type TradeStatus = 'Open' | 'Closed';

export interface Trade {
  id: string;
  instrument: string;
  side: TradeSide;
  entryPrice: number;
  exitPrice?: number;
  quantity: number;
  entryDate: string;
  exitDate?: string;
  status: TradeStatus;
  strategy?: string;
  notes?: string;
}

export interface TradeMetrics {
  totalTrades: number;
  winRate: number;
  totalPnL: number;
  averageWin: number;
  averageLoss: number;
  profitFactor: number;
}
