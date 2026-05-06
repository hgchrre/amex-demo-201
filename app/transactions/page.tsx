'use client';

import { useEffect, useState } from 'react';
import type { CardTransaction, TransactionMetrics } from '@/lib/card-business/mock-data';
import { getTransactionStatusConfig, getTransactionTypeConfig } from '@/lib/card-business/status-utils';
import { PageHeader } from '@/components/card-business/Shell/PageHeader';
import { Shield, Percent, Globe2, Gauge } from 'lucide-react';

export default function TransactionsPage() {
  const [metrics, setMetrics] = useState<TransactionMetrics | null>(null);
  const [transactions, setTransactions] = useState<CardTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/card-business/transactions')
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data.metrics ?? null);
        setTransactions(data.transactions || []);
        setLoading(false);
      });
  }, []);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);

  const formatVol = (n: number) =>
    n >= 1_000_000_000_000
      ? `$${(n / 1_000_000_000_000).toFixed(2)}T`
      : `$${(n / 1_000_000_000).toFixed(1)}B`;

  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="Network"
        title="Transaction analytics"
        description="Trailing volume, authorization quality, fraud and dispute rates, and recent transaction detail."
      />

      {loading || !metrics ? (
        <div className="text-text-muted text-sm">Loading...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            <div className="card p-5">
              <div className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-wider mb-2">
                <Gauge className="w-4 h-4" /> Total volume (TTM)
              </div>
              <div className="text-2xl font-semibold text-foreground tabular-nums">{formatVol(metrics.totalVolume)}</div>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-wider mb-2">
                <Percent className="w-4 h-4" /> Authorization rate
              </div>
              <div className="text-2xl font-semibold text-foreground tabular-nums">{metrics.authorizationRate}%</div>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-wider mb-2">
                <Shield className="w-4 h-4" /> Fraud / disputes
              </div>
              <div className="text-lg font-semibold text-foreground">
                {metrics.fraudRate}% fraud · {metrics.disputeRate}% disputes
              </div>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-2 text-text-muted text-xs uppercase tracking-wider mb-2">
                <Globe2 className="w-4 h-4" /> Cross-border
              </div>
              <div className="text-2xl font-semibold text-foreground tabular-nums">{metrics.crossBorderPct}%</div>
            </div>
            <div className="card p-5 md:col-span-2">
              <div className="text-text-muted text-xs uppercase tracking-wider mb-2">Avg ticket size</div>
              <div className="text-2xl font-semibold text-foreground tabular-nums">
                {formatCurrency(metrics.avgTransactionSize)}
              </div>
            </div>
          </div>

          <h2 className="type-display text-lg font-semibold text-foreground mb-4">Recent transactions</h2>
          <div className="space-y-3">
            {transactions.map((txn) => {
              const st = getTransactionStatusConfig(txn.status);
              const tp = getTransactionTypeConfig(txn.type);
              const StatusIcon = st.icon;
              const TypeIcon = tp.icon;
              return (
                <div key={txn.id} className="card p-4 hover:bg-surface-muted/20">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-semibold border ${st.color}`}>
                      <StatusIcon className="w-3 h-3" />
                      {txn.status}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-semibold border ${tp.color}`}>
                      <TypeIcon className="w-3 h-3" />
                      {txn.type.replace('-', ' ')}
                    </span>
                    <span className="text-sm font-semibold text-foreground ml-auto tabular-nums">
                      {formatCurrency(txn.amount)}
                    </span>
                  </div>
                  <div className="text-sm text-text-muted space-y-1">
                    <div>{txn.merchantCategory}</div>
                    <div className="text-xs">
                      {txn.region} · {new Date(txn.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
