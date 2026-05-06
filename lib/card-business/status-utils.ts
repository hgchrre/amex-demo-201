/**
 * Status & tier styling for card business UI
 */
import { CheckCircle, XCircle, AlertTriangle, ArrowLeftRight, ShoppingCart } from 'lucide-react';
import type { CardTransaction, CardTier } from './mock-data';

export interface StatusConfig {
  color: string;
  icon: typeof CheckCircle;
}

export function getTransactionStatusConfig(status: CardTransaction['status']): StatusConfig {
  switch (status) {
    case 'approved':
      return { color: 'text-success bg-success/10 border-success/20', icon: CheckCircle };
    case 'declined':
      return { color: 'text-danger bg-danger/10 border-danger/20', icon: XCircle };
    case 'flagged':
      return { color: 'text-warning bg-warning/10 border-warning/20', icon: AlertTriangle };
    default:
      return { color: 'text-text-muted bg-surface-highlight border-white/10', icon: AlertTriangle };
  }
}

export function getTransactionTypeConfig(type: CardTransaction['type']): StatusConfig {
  switch (type) {
    case 'purchase':
      return { color: 'text-info bg-info/10 border-info/20', icon: ShoppingCart };
    case 'return':
      return { color: 'text-primary-light bg-primary/10 border-primary/20', icon: ArrowLeftRight };
    case 'cash-advance':
      return { color: 'text-warning bg-warning/10 border-warning/20', icon: AlertTriangle };
    default:
      return { color: 'text-text-muted bg-surface-highlight border-white/10', icon: ShoppingCart };
  }
}

export function getTierBadgeClasses(tier: CardTier): string {
  switch (tier) {
    case 'platinum':
      return 'bg-slate-700 text-white border-slate-600';
    case 'gold':
      return 'bg-amber-600/15 text-amber-800 border-amber-500/30';
    case 'green':
      return 'bg-emerald-600/15 text-emerald-800 border-emerald-500/30';
    case 'blue':
      return 'text-primary bg-primary/10 border-primary/25';
    case 'cobrand':
      return 'bg-violet-600/15 text-violet-800 border-violet-500/30';
    default:
      return 'bg-surface-highlight text-foreground border-gray-200';
  }
}
