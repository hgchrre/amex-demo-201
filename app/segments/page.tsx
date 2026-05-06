'use client';

import { useEffect, useState } from 'react';
import type { BusinessSegment } from '@/lib/card-business/mock-data';
import { PageHeader } from '@/components/card-business/Shell/PageHeader';
import { Building2, CreditCard, TrendingUp, Wallet } from 'lucide-react';

function formatCompactUsd(n: number): string {
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

export default function SegmentsPage() {
  const [segments, setSegments] = useState<BusinessSegment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/card-business/segments')
      .then((res) => res.json())
      .then((data) => {
        setSegments(data.segments || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="Operating model"
        title="Business segments"
        description="Revenue, cards in force, and billed business by major operating segment."
      />

      {loading ? (
        <div className="text-text-muted text-sm">Loading segments...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {segments.map((s) => (
            <div key={s.id} className="card p-6 hover:bg-surface-muted/25">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-[var(--radius-control)] bg-primary/10 text-primary">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="type-display font-semibold text-foreground text-lg">{s.name}</h3>
                    <div className="flex items-center gap-2 mt-1 text-sm text-success font-medium">
                      <TrendingUp className="w-4 h-4" />
                      +{s.yoyGrowth}% YoY revenue
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="min-w-0 bg-surface-muted/80 rounded-[var(--radius-control)] p-3 border border-[var(--amex-border)]">
                  <div className="text-xs text-text-muted mb-1 flex items-center gap-1">
                    <Wallet className="w-3.5 h-3.5 shrink-0" /> Revenue (TTM)
                  </div>
                  <div className="font-semibold text-foreground tabular-nums text-sm sm:text-base">
                    {formatCompactUsd(s.revenue)}
                  </div>
                </div>
                <div className="min-w-0 bg-surface-muted/80 rounded-[var(--radius-control)] p-3 border border-[var(--amex-border)]">
                  <div className="text-xs text-text-muted mb-1 flex items-center gap-1">
                    <CreditCard className="w-3.5 h-3.5 shrink-0" /> Cards in force
                  </div>
                  <div className="font-semibold text-foreground tabular-nums text-sm sm:text-base">
                    {s.cardsInForce.toLocaleString()}
                  </div>
                </div>
                <div className="min-w-0 bg-surface-muted/80 rounded-[var(--radius-control)] p-3 border border-[var(--amex-border)] sm:col-span-2 lg:col-span-1">
                  <div className="text-xs text-text-muted mb-1">Billed business</div>
                  <div className="font-semibold text-foreground tabular-nums text-sm sm:text-base">
                    {formatCompactUsd(s.billedBusiness)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
