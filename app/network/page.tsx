'use client';

import { useEffect, useState } from 'react';
import type { NetworkRegion } from '@/lib/card-business/mock-data';
import { PageHeader } from '@/components/card-business/Shell/PageHeader';
import { Globe, MapPin, Store } from 'lucide-react';

function formatCompactUsd(n: number): string {
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

/** Distinct markers for schematic legend readability (theme CSS variables). */
const REGION_DOT_FILLS = [
  'var(--primary)',
  'var(--info)',
  'var(--secondary)',
  'var(--success)',
  'var(--warning)',
] as const;

function regionAbbrev(label: string): string {
  const known: Record<string, string> = {
    'North America': 'NA',
    Europe: 'EU',
    'Asia Pacific': 'APAC',
    'Latin America': 'LATAM',
    'Middle East & Africa': 'MEA',
  };
  return known[label] ?? label.slice(0, 3).toUpperCase();
}

export default function NetworkPage() {
  const [regions, setRegions] = useState<NetworkRegion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/card-business/network')
      .then((res) => res.json())
      .then((data) => {
        setRegions(data.regions || []);
        setLoading(false);
      });
  }, []);

  const totalMerchants = regions.reduce((s, r) => s + r.merchantCount, 0);
  const totalVol = regions.reduce((s, r) => s + r.transactionVolume, 0);

  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="Acceptance"
        title="Global network"
        description="Merchant footprint, billed business by region, and indicative share — leadership view."
      />

      {loading ? (
        <div className="text-text-muted text-sm">Loading network...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="card p-4">
              <div className="flex items-center gap-2 text-text-muted text-xs uppercase mb-2">
                <Store className="w-4 h-4" /> Merchants (approx.)
              </div>
              <div className="text-2xl font-bold text-foreground">{totalMerchants.toLocaleString()}</div>
            </div>
            <div className="card p-4 md:col-span-2">
              <div className="flex items-center gap-2 text-text-muted text-xs uppercase mb-2">
                <Globe className="w-4 h-4" /> Network volume (sum of regions)
              </div>
              <div className="text-2xl font-bold text-foreground">{formatCompactUsd(totalVol)}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h2 className="type-display text-lg font-semibold text-foreground mb-1">Regional footprint</h2>
              <p className="text-xs text-text-muted mb-4">
                Schematic plot (not a geographic map). Dots mark relative emphasis by region for this demo.
              </p>
              <div className="relative aspect-[16/10] bg-surface-muted/60 rounded-[var(--radius-card)] overflow-hidden border border-[var(--amex-border)]">
                <div
                  className="pointer-events-none absolute inset-4 rounded-md opacity-[0.35]"
                  aria-hidden
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, var(--amex-border-strong) 1px, transparent 1px),
                      linear-gradient(to bottom, var(--amex-border-strong) 1px, transparent 1px)
                    `,
                    backgroundSize: '28px 28px',
                  }}
                />
                <div className="absolute inset-4">
                  {regions.map((r, idx) => {
                    const fill = REGION_DOT_FILLS[idx % REGION_DOT_FILLS.length];
                    const left = `${50 + r.longitude / 3}%`;
                    const top = `${35 - r.latitude / 4}%`;
                    return (
                      <div
                        key={r.id}
                        className="absolute flex flex-col items-center gap-1 -translate-x-1/2 -translate-y-1/2"
                        style={{ left, top }}
                      >
                        <span
                          className="h-3 w-3 shrink-0 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: fill }}
                          title={r.region}
                        />
                        <span className="rounded bg-surface/95 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-foreground shadow-sm ring-1 ring-[var(--amex-border)]">
                          {regionAbbrev(r.region)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="absolute bottom-2 left-3 right-3 text-[10px] text-text-muted leading-snug">
                  Grid for reading position only · Point = region marker for the list at right
                </p>
              </div>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-text-muted">
                {regions.map((r, idx) => (
                  <li key={`leg-${r.id}`} className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full border border-[var(--amex-border-strong)]"
                      style={{ backgroundColor: REGION_DOT_FILLS[idx % REGION_DOT_FILLS.length] }}
                      aria-hidden
                    />
                    <span className="text-foreground">{r.region}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              {regions.map((r) => (
                <div key={r.id} className="card p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-foreground flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {r.region}
                    </h3>
                    <span className="text-sm font-medium text-foreground">{r.marketSharePct}% share</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-text-muted">Merchants</div>
                      <div className="font-medium">{r.merchantCount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-muted">Volume</div>
                      <div className="font-medium">{formatCompactUsd(r.transactionVolume)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
