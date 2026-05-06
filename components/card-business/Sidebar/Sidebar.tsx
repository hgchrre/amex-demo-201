'use client';

import {
  LayoutDashboard,
  CreditCard,
  Building2,
  Activity,
  Globe,
  DollarSign,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AmexMark } from '@/components/card-business/Brand/AmexMark';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Card Products', href: '/card-products', icon: CreditCard },
  { name: 'Business Segments', href: '/segments', icon: Building2 },
  { name: 'Transaction Analytics', href: '/transactions', icon: Activity },
  { name: 'Global Network', href: '/network', icon: Globe },
  { name: 'Revenue Breakdown', href: '/revenue', icon: DollarSign },
];

function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="relative w-[272px] shrink-0 h-full min-h-0 flex flex-col overflow-y-auto border-r border-white/10 bg-[var(--amex-midnight-deep)] bg-[linear-gradient(180deg,var(--amex-midnight-deep)_0%,var(--amex-midnight)_52%,#243a5c_100%)] shadow-[4px_0_32px_rgba(0,23,90,0.14)] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[var(--amex-blue)]"
      aria-label="Main navigation"
    >
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-start gap-3 group rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          <AmexMark
            size={48}
            className="shadow-md shadow-black/20 group-hover:shadow-lg group-hover:shadow-black/25 transition-shadow duration-200"
          />
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-white font-semibold text-[13px] leading-snug tracking-tight">
              American Express
            </p>
            <p className="text-[10px] text-white/70 uppercase tracking-[0.16em] font-semibold mt-1 leading-tight">
              Leadership dashboard
            </p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-0.5" aria-label="Primary">
        {navigation.map((item) => {
          const active = isNavActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[var(--radius-control)] text-[13px] font-medium interactive-surface ${
                active
                  ? 'bg-white/14 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]'
                  : 'text-white/78 hover:bg-white/8 hover:text-white'
              }`}
            >
              <Icon className={`w-[18px] h-[18px] shrink-0 ${active ? 'text-[var(--amex-blue-bright)]' : ''}`} />
              <span className="leading-snug">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <p className="text-[10px] text-white/50 text-center uppercase tracking-[0.2em] font-semibold">
          Card business
        </p>
        <p className="text-[10px] text-white/40 text-center mt-1">Internal demo</p>
      </div>
    </aside>
  );
}
