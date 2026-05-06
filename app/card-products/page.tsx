'use client';

import { useEffect, useState } from 'react';
import type { AcquisitionTrendPoint, CardProduct, CardTier } from '@/lib/card-business/mock-data';
import { getTierBadgeClasses } from '@/lib/card-business/status-utils';
import { PageHeader } from '@/components/card-business/Shell/PageHeader';
import { CreditCard, Users, Wallet } from 'lucide-react';

function formatCompactUsd(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function CardProductsPage() {
  const [products, setProducts] = useState<CardProduct[]>([]);
  const [trend, setTrend] = useState<AcquisitionTrendPoint[]>([]);
  const [tierFilter, setTierFilter] = useState<CardTier | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const ac = new AbortController();
    fetch('/api/card-business/card-products', { signal: ac.signal })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setProducts(data.cardProducts || []);
        setTrend(data.acquisitionTrend || []);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled || err.name === 'AbortError') return;
        setError('Failed to load card products');
        setLoading(false);
      });
    return () => {
      cancelled = true;
      ac.abort();
    };
  }, []);

  const filtered =
    tierFilter === 'all' ? products : products.filter((p) => p.tier === tierFilter);

  const maxAcq = Math.max(...trend.map((t) => t.acquisitions), 1);

  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="Portfolio"
        title="Card products"
        description="Cards in force, spend intensity, acquisitions, and revenue contribution by product."
      />

      <div className="mb-6 flex flex-wrap gap-2">
        {(['all', 'platinum', 'gold', 'green', 'blue', 'cobrand'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTierFilter(t)}
            className={`px-4 py-2 rounded-[var(--radius-control)] text-sm font-semibold interactive-surface ${
              tierFilter === t
                ? 'bg-primary text-white shadow-sm ring-1 ring-primary/30'
                : 'bg-white/80 text-text-muted border border-[var(--amex-border)] hover:text-foreground hover:border-[var(--amex-border-strong)]'
            }`}
          >
            {t === 'all' ? 'All tiers' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-danger/10 text-danger rounded text-sm" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-text-muted text-sm">Loading...</div>
      ) : (
        <div className="space-y-8">
          <div className="card p-6">
            <h2 className="type-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              New account acquisitions (6 months)
            </h2>
            <div className="px-1">
              <div className="flex min-h-[188px] items-end justify-between gap-2 border-b-2 border-[var(--amex-border-strong)]">
                {trend.map((pt) => {
                  const barH = 36 + (pt.acquisitions / maxAcq) * 120;
                  return (
                    <div
                      key={pt.month}
                      className="flex min-w-0 flex-1 flex-col items-center gap-1"
                    >
                      <span className="text-[10px] font-semibold tabular-nums text-foreground">
                        {(pt.acquisitions / 1_000_000).toFixed(2)}M
                      </span>
                      <div
                        className="w-full max-w-14 rounded-t-md bg-primary shadow-sm min-h-2"
                        style={{ height: `${barH}px` }}
                        title={`${pt.month}: ${pt.acquisitions.toLocaleString()} acquisitions`}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="mt-2 flex justify-between gap-2 px-0.5">
                {trend.map((pt) => (
                  <span
                    key={`${pt.month}-axis`}
                    className="min-w-0 flex-1 text-center text-[10px] font-semibold uppercase tracking-wide text-text-muted"
                  >
                    {pt.month}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <div key={p.id} className="card p-6 hover:bg-surface-muted/30">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-[var(--radius-control)] bg-primary/10 text-primary">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{p.name}</h3>
                      <span
                        className={`inline-block mt-1 text-[10px] uppercase font-semibold px-2 py-0.5 rounded border ${getTierBadgeClasses(p.tier)}`}
                      >
                        {p.tier}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-surface-muted/80 rounded-[var(--radius-control)] p-3 border border-[var(--amex-border)]">
                    <div className="text-xs text-text-muted mb-1">Cards in force</div>
                    <div className="font-semibold text-foreground">{p.cardsInForce.toLocaleString()}</div>
                  </div>
                  <div className="bg-surface-muted/80 rounded-[var(--radius-control)] p-3 border border-[var(--amex-border)]">
                    <div className="text-xs text-text-muted mb-1">Avg spend / card</div>
                    <div className="font-semibold text-foreground">
                      {formatCompactUsd(p.avgSpendPerCard)}
                    </div>
                  </div>
                  <div className="bg-surface-muted/80 rounded-[var(--radius-control)] p-3 border border-[var(--amex-border)]">
                    <div className="text-xs text-text-muted mb-1">Annual fee</div>
                    <div className="font-semibold text-foreground flex items-center gap-1">
                      <Wallet className="w-3.5 h-3.5" />
                      {p.annualFee === 0 ? 'No AF' : `$${p.annualFee}`}
                    </div>
                  </div>
                  <div className="bg-surface-muted/80 rounded-[var(--radius-control)] p-3 border border-[var(--amex-border)]">
                    <div className="text-xs text-text-muted mb-1">Q acquisitions</div>
                    <div className="font-semibold text-foreground">{p.acquisitionsThisQuarter.toLocaleString()}</div>
                  </div>
                  <div className="bg-surface-muted/80 rounded-[var(--radius-control)] p-3 border border-[var(--amex-border)]">
                    <div className="text-xs text-text-muted mb-1">Attrition</div>
                    <div className="font-semibold text-foreground">{p.attritionRate}%</div>
                  </div>
                  <div className="bg-surface-muted/80 rounded-[var(--radius-control)] p-3 col-span-2 border border-[var(--amex-border)]">
                    <div className="text-xs text-text-muted mb-1">Revenue contribution (TTM)</div>
                    <div className="font-semibold text-foreground">{formatCompactUsd(p.revenueContribution)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
