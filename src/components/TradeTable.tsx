import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Trade } from '../types/trade';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

interface TradeTableProps {
  trades: Trade[];
  onDelete: (id: string) => void;
}

export function TradeTable({ trades, onDelete }: TradeTableProps) {
  const calculatePnL = (trade: Trade) => {
    if (trade.status === 'Open' || !trade.exitPrice) return null;
    return trade.side === 'Long'
      ? (trade.exitPrice - trade.entryPrice) * trade.quantity
      : (trade.entryPrice - trade.exitPrice) * trade.quantity;
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Instrument</TableHead>
            <TableHead>Side</TableHead>
            <TableHead>Entry</TableHead>
            <TableHead>Exit</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>P&L</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No trades recorded yet.
              </TableCell>
            </TableRow>
          ) : (
            trades.map((trade) => {
              const pnl = calculatePnL(trade);
              return (
                <TableRow key={trade.id}>
                  <TableCell>{trade.entryDate}</TableCell>
                  <TableCell className="font-medium">{trade.instrument}</TableCell>
                  <TableCell>
                    <Badge variant={trade.side === 'Long' ? 'default' : 'secondary'}>
                      {trade.side}
                    </Badge>
                  </TableCell>
                  <TableCell>${trade.entryPrice.toLocaleString()}</TableCell>
                  <TableCell>
                    {trade.exitPrice ? `$${trade.exitPrice.toLocaleString()}` : '-'}
                  </TableCell>
                  <TableCell>{trade.quantity}</TableCell>
                  <TableCell className={pnl !== null ? (pnl >= 0 ? 'text-green-500' : 'text-red-500') : ''}>
                    {pnl !== null ? `$${pnl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={trade.status === 'Open' ? 'outline' : 'default'}>
                      {trade.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(trade.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
