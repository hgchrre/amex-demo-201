'use client';

import { useEffect, useState } from 'react';
import type { RevenueStream } from '@/lib/card-business/mock-data';
import { PageHeader } from '@/components/card-business/Shell/PageHeader';
import { TrendingUp } from 'lucide-react';

function formatCompactUsd(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function RevenuePage() {
  const [streams, setStreams] = useState<RevenueStream[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/card-business/revenue')
      .then((res) => res.json())
      .then((data) => {
        setStreams(data.revenueStreams || []);
        setLoading(false);
      });
  }, []);

  const total = streams.reduce((s, r) => s + r.amount, 0);

  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="Financial performance"
        title="Revenue breakdown"
        description="Trailing-twelve-month mix across discount revenue, interest, fees, travel, and other streams."
      />

      {loading ? (
        <div className="text-text-muted text-sm">Loading revenue...</div>
      ) : (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="text-sm text-text-muted mb-1">Total revenue (TTM)</div>
            <div className="text-3xl font-bold text-foreground">{formatCompactUsd(total)}</div>
          </div>

          <div className="card p-6">
            <h2 className="type-display text-lg font-semibold text-foreground mb-4">Composition</h2>
            <div className="space-y-4">
              {streams.map((r) => (
                <div key={r.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{r.label}</span>
                    <span className="text-text-muted">
                      {formatCompactUsd(r.amount)} · {r.pctOfTotal.toFixed(1)}%
                    </span>
                  </div>
                  <div className="relative h-3 w-full overflow-hidden rounded-md bg-surface-highlight">
                    <div
                      className="absolute inset-y-0 left-0 rounded-md bg-primary"
                      style={{
                        width: `${r.pctOfTotal}%`,
                        minWidth: r.pctOfTotal > 0 ? '4px' : undefined,
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-success">
                    <TrendingUp className="w-3 h-3" />
                    +{r.yoyChange}% YoY
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {streams.map((r) => (
              <div key={`${r.id}-card`} className="card p-5">
                <h3 className="font-semibold text-foreground mb-2">{r.label}</h3>
                <div className="text-2xl font-bold text-foreground mb-1">{formatCompactUsd(r.amount)}</div>
                <div className="text-xs text-text-muted capitalize">{r.category.replace(/-/g, ' ')}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
