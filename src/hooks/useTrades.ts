import { useState, useEffect, useMemo } from 'react';
import { Trade, TradeMetrics } from '../types/trade';

const LOCAL_STORAGE_KEY = 'trading-journal-trades';

export function useTrades() {
  const [trades, setTrades] = useState<Trade[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(trades));
  }, [trades]);

  const addTrade = (trade: Omit<Trade, 'id'>) => {
    const newTrade: Trade = {
      ...trade,
      id: crypto.randomUUID(),
    };
    setTrades((prev) => [newTrade, ...prev]);
  };

  const updateTrade = (id: string, updates: Partial<Trade>) => {
    setTrades((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTrade = (id: string) => {
    setTrades((prev) => prev.filter((t) => t.id !== id));
  };

  const metrics = useMemo<TradeMetrics>(() => {
    const closedTrades = trades.filter((t) => t.status === 'Closed' && t.exitPrice !== undefined);
    
    let totalPnL = 0;
    let wins = 0;
    let totalWinAmount = 0;
    let totalLossAmount = 0;
    let losses = 0;

    closedTrades.forEach((trade) => {
      const pnl = trade.side === 'Long'
        ? (trade.exitPrice! - trade.entryPrice) * trade.quantity
        : (trade.entryPrice - trade.exitPrice!) * trade.quantity;
      
      totalPnL += pnl;
      if (pnl > 0) {
        wins++;
        totalWinAmount += pnl;
      } else if (pnl < 0) {
        losses++;
        totalLossAmount += Math.abs(pnl);
      }
    });

    return {
      totalTrades: trades.length,
      winRate: closedTrades.length > 0 ? (wins / closedTrades.length) * 100 : 0,
      totalPnL,
      averageWin: wins > 0 ? totalWinAmount / wins : 0,
      averageLoss: losses > 0 ? totalLossAmount / losses : 0,
      profitFactor: totalLossAmount > 0 ? totalWinAmount / totalLossAmount : totalWinAmount > 0 ? Infinity : 0,
    };
  }, [trades]);

  return {
    trades,
    addTrade,
    updateTrade,
    deleteTrade,
    metrics,
  };
}
