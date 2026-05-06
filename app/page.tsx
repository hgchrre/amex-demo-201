'use client';

import { useEffect, useState } from 'react';
import { MetricsCard } from '@/components/card-business/Dashboard/MetricsCard';
import { RecentActivity } from '@/components/card-business/Dashboard/RecentActivity';
import { PageHeader } from '@/components/card-business/Shell/PageHeader';
import type { ExecutiveOverview } from '@/lib/card-business/mock-data';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  PieChart,
  Plus,
  Activity,
  Globe,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

function formatCompactUsd(n: number): string {
  if (n >= 1_000_000_000_000) {
    return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (n >= 1_000_000_000) {
    return `$${(n / 1_000_000_000).toFixed(1)}B`;
  }
  if (n >= 1_000_000) {
    return `$${(n / 1_000_000).toFixed(1)}M`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);
}

const quickLinkClass =
  'interactive-surface block p-4 rounded-[var(--radius-card)] border border-[var(--amex-border)] bg-white/90 hover:border-primary/35 hover:shadow-[var(--shadow-md)] group';

export default function Dashboard() {
  const [overview, setOverview] = useState<ExecutiveOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/card-business/overview')
      .then((res) => res.json())
      .then((data) => {
        setOverview(data.overview ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="page-shell">
      <PageHeader
        eyebrow="Global card business"
        title="Executive dashboard"
        description="Leadership snapshot of cards in force, billed business, profitability, and recent network activity."
      />

      {loading || !overview ? (
        <div className="text-text-muted text-sm py-12">Loading metrics...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
            <MetricsCard
              title="Cards in force"
              value={new Intl.NumberFormat('en-US').format(overview.cardsInForce)}
              icon={CreditCard}
              color="info"
              trend={`+${overview.yoyCardsGrowth}% YoY`}
            />
            <MetricsCard
              title="Billed business (TTM)"
              value={formatCompactUsd(overview.billedBusiness)}
              icon={TrendingUp}
              color="primary"
              trend={`+${overview.yoyBilledBusinessGrowth}% YoY`}
            />
            <MetricsCard
              title="Total revenue (TTM)"
              value={formatCompactUsd(overview.totalRevenue)}
              icon={DollarSign}
              color="success"
              trend={`+${overview.yoyTotalRevenueGrowth}% YoY`}
            />
            <MetricsCard
              title="Net income (TTM)"
              value={formatCompactUsd(overview.netIncome)}
              icon={PieChart}
              color="warning"
              trend={`+${overview.yoyNetIncomeGrowth}% YoY`}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentActivity />
            <div className="card p-6">
              <h2 className="type-display text-lg font-semibold text-foreground mb-4">Quick actions</h2>
              <div className="space-y-3">
                <Link href="/card-products" className={quickLinkClass}>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-[var(--radius-control)] bg-primary/12 text-primary group-hover:bg-primary group-hover:text-white">
                      <Plus className="w-5 h-5" aria-hidden />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">Card products</div>
                      <div className="text-xs text-text-muted">Performance by product and tier</div>
                    </div>
                  </div>
                </Link>
                <Link href="/transactions" className={quickLinkClass}>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-[var(--radius-control)] bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white">
                      <Activity className="w-5 h-5" aria-hidden />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">Transaction analytics</div>
                      <div className="text-xs text-text-muted">Volume, authorization, fraud, disputes</div>
                    </div>
                  </div>
                </Link>
                <Link href="/network" className={quickLinkClass}>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-[var(--radius-control)] bg-info/12 text-info group-hover:bg-info group-hover:text-white">
                      <Globe className="w-5 h-5" aria-hidden />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">Global network</div>
                      <div className="text-xs text-text-muted">Merchants, volume, and share by region</div>
                    </div>
                  </div>
                </Link>
                <Link href="/revenue" className={quickLinkClass}>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-[var(--radius-control)] bg-success/10 text-success group-hover:bg-success group-hover:text-white">
                      <BarChart3 className="w-5 h-5" aria-hidden />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">Revenue breakdown</div>
                      <div className="text-xs text-text-muted">Discount, interest, fees, and travel</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-text-muted mt-8 font-medium">
            Last updated: {new Date(overview.lastUpdated).toLocaleString()}
          </p>
        </>
      )}
    </div>
  );
}
