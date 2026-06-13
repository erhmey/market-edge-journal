import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { TradeForm } from './components/TradeForm';
import { TradeTable } from './components/TradeTable';
import { useTrades } from './hooks/useTrades';
import { Button } from './components/ui/button';
import { Plus, LayoutDashboard, History } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { Trade } from './types/trade';

function App() {
  const { trades, addTrade, deleteTrade, metrics } = useTrades();
  const [isAddingTrade, setIsAddingTrade] = useState(false);

  const handleAddTrade = (tradeData: Omit<Trade, 'id'>) => {
    addTrade(tradeData);
    setIsAddingTrade(false);
    toast.success('Trade added successfully');
  };

  const handleDeleteTrade = (id: string) => {
    deleteTrade(id);
    toast.success('Trade deleted');
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Trading Journal</h1>
            <p className="text-muted-foreground">Track your performance and improve your strategy.</p>
          </div>
          <Button onClick={() => setIsAddingTrade(true)} className="w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Trade
          </Button>
        </header>

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <LayoutDashboard className="h-5 w-5" />
            <h2>Dashboard</h2>
          </div>
          <Dashboard metrics={metrics} />
        </section>

        {isAddingTrade && (
          <section className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Plus className="h-5 w-5" />
              <h2>New Trade Entry</h2>
            </div>
            <TradeForm 
              onSubmit={handleAddTrade} 
              onCancel={() => setIsAddingTrade(false)} 
            />
          </section>
        )}

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <History className="h-5 w-5" />
            <h2>Trade History</h2>
          </div>
          <TradeTable trades={trades} onDelete={handleDeleteTrade} />
        </section>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
