# Implementation Plan - Trading Journal App (LocalStorage Persistence)

The user wants a trading journal application. Since Supabase is not available in this session, persistence will be handled via `localStorage`.

## Scope & Non-Goals
- **Scope:** CRUD for trade entries (instrument, entry/exit price, quantity, date, notes), dashboard with key metrics (total P&L, win rate), and trade history table.
- **Persistence:** All data saved to and loaded from `localStorage`.
- **UI:** Modern, responsive dashboard using React, Tailwind CSS, Lucide icons, and Shadcn UI components.

## Affected Areas
- **Frontend:** React application with local state and `localStorage` synchronization.
- **Components:** Dashboard, TradeForm, TradeTable.

## Order of Operations
1. **Core Logic:** Define the Trade type and a custom hook `useTrades` for `localStorage` management.
2. **UI Implementation:** 
   - Dashboard: Summary cards for P&L, Win Rate, and Total Trades.
   - Trade Form: For adding/editing trades.
   - Trade Table: For viewing and deleting trades.
3. **Analytics:** Logic to calculate metrics from the trade list.

## Execution Handoff

**Plan status:** ready

**Dispatch order:**
1. frontend_engineer — Implement the entire application logic and UI.

**Per-agent instructions:**
### 1. frontend_engineer
- **Phases:** Phase 1-3
- **Scope:** Build the trading journal.
- **Tasks:**
  - Create `src/types/trade.ts` for type definitions.
  - Create `src/hooks/useTrades.ts` to manage `localStorage` persistence.
  - Create `src/components/Dashboard.tsx` for metrics.
  - Create `src/components/TradeForm.tsx` for adding trades (fix any TS errors from previous attempts).
  - Create `src/components/TradeTable.tsx` for the history list.
  - Update `src/App.tsx` to orchestrate these components.
- **Acceptance criteria:**
  - Users can add, view, and delete trades.
  - Trades persist across page reloads using `localStorage`.
  - Dashboard shows correct P&L and win rate.
  - Application passes build/typecheck.
