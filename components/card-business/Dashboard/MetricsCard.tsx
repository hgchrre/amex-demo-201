import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: 'primary' | 'info' | 'success' | 'warning' | 'danger';
}

export function MetricsCard({ title, value, icon: Icon, trend, color = 'info' }: MetricsCardProps) {
  const colorClasses = {
    primary: 'text-primary bg-primary/12 ring-1 ring-primary/15',
    info: 'text-info bg-info/12 ring-1 ring-info/15',
    success: 'text-success bg-success/10 ring-1 ring-success/15',
    warning: 'text-warning bg-warning/12 ring-1 ring-warning/20',
    danger: 'text-danger bg-danger/10 ring-1 ring-danger/15',
  };

  return (
    <div className="card p-6 hover-lift">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className={`p-2.5 rounded-[var(--radius-control)] ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" aria-hidden />
        </div>
        {trend ? (
          <span className="text-[11px] text-success font-semibold bg-success/10 px-2 py-1 rounded-md border border-success/15">
            {trend}
          </span>
        ) : null}
      </div>
      <h3 className="text-[11px] text-text-muted uppercase tracking-[0.1em] font-semibold mb-1.5">{title}</h3>
      <p className="text-[1.35rem] sm:text-[1.5rem] font-semibold text-foreground tabular-nums tracking-tight leading-tight">
        {value}
      </p>
    </div>
  );
}
