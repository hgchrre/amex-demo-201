'use client';

import { useEffect, useState } from 'react';
import type { CardTransaction } from '@/lib/card-business/mock-data';
import Link from 'next/link';
import { getTransactionStatusConfig } from '@/lib/card-business/status-utils';
import { ArrowUpRight } from 'lucide-react';

export function RecentActivity() {
  const [transactions, setTransactions] = useState<CardTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/card-business/transactions')
      .then((res) => res.json())
      .then((data) => {
        const list: CardTransaction[] = data.transactions || [];
        setTransactions(list.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  if (loading) {
    return (
      <div className="card p-6">
        <h2 className="type-display text-lg font-semibold text-foreground mb-4">Recent activity</h2>
        <div className="text-text-muted text-sm">Loading...</div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="type-display text-lg font-semibold text-foreground">Recent activity</h2>
        <Link
          href="/transactions"
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-light interactive-surface"
        >
          View all
          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
        </Link>
      </div>
      {transactions.length === 0 ? (
        <div className="text-text-muted py-10 text-center text-sm rounded-[var(--radius-control)] bg-surface-muted/50 border border-dashed border-[var(--amex-border)]">
          No recent transactions
        </div>
      ) : (
        <ul className="space-y-2 list-none p-0 m-0">
          {transactions.map((txn) => {
            const cfg = getTransactionStatusConfig(txn.status);
            const StatusIcon = cfg.icon;
            return (
              <li key={txn.id}>
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-[var(--radius-control)] border border-[var(--amex-border)] bg-white/80 hover:bg-white hover:border-[var(--amex-border-strong)] hover:shadow-sm interactive-surface">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wide border ${cfg.color}`}
                      >
                        <StatusIcon className="w-3 h-3" aria-hidden />
                        {txn.status}
                      </span>
                      <span className="font-semibold text-foreground text-sm truncate">{txn.merchantCategory}</span>
                    </div>
                    <div className="text-xs text-text-muted">
                      {new Date(txn.timestamp).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {' · '}
                      {txn.region}
                      {' · '}
                      <span className="capitalize">{txn.type.replace('-', ' ')}</span>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-foreground tabular-nums shrink-0">
                    {formatCurrency(txn.amount)}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
