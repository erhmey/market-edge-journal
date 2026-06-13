import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Trade, TradeSide, TradeStatus } from '../types/trade';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const tradeSchema = z.object({
  instrument: z.string().min(1, 'Instrument is required'),
  side: z.enum(['Long', 'Short'] as const),
  entryPrice: z.preprocess((val) => Number(val), z.number().positive('Price must be positive')),
  exitPrice: z.preprocess((val) => val === '' ? undefined : Number(val), z.number().positive('Price must be positive').optional()),
  quantity: z.preprocess((val) => Number(val), z.number().positive('Quantity must be positive')),
  entryDate: z.string().min(1, 'Date is required'),
  exitDate: z.string().optional(),
  status: z.enum(['Open', 'Closed'] as const),
  strategy: z.string().optional(),
  notes: z.string().optional(),
});

type TradeFormValues = z.infer<typeof tradeSchema>;

interface TradeFormProps {
  onSubmit: (values: Omit<Trade, 'id'>) => void;
  onCancel?: () => void;
}

export function TradeForm({ onSubmit, onCancel }: TradeFormProps) {
  const form = useForm<TradeFormValues>({
    resolver: zodResolver(tradeSchema) as any,
    defaultValues: {
      instrument: '',
      side: 'Long',
      entryPrice: 0,
      quantity: 1,
      entryDate: new Date().toISOString().split('T')[0],
      status: 'Open',
      strategy: '',
      notes: '',
    },
  });

  const handleSubmit: SubmitHandler<TradeFormValues> = (values) => {
    onSubmit(values as Omit<Trade, 'id'>);
    form.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Trade</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="instrument"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instrument</FormLabel>
                    <FormControl>
                      <Input placeholder="BTC/USD, AAPL, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="side"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Side</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select side" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Long">Long</SelectItem>
                        <SelectItem value="Short">Short</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="entryPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="entryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch('status') === 'Closed' && (
                <>
                  <FormField
                    control={form.control}
                    name="exitPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exit Price</FormLabel>
                        <FormControl>
                          <Input type="number" step="any" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="exitDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Exit Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <div className="flex justify-end gap-2">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit">Save Trade</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
