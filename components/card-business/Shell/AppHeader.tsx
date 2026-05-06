'use client';

import { BarChart3, CalendarClock, Search, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  { label: 'Dashboard', href: '/' },
  { label: 'Products', href: '/card-products' },
  { label: 'Segments', href: '/segments' },
  { label: 'Transactions', href: '/transactions' },
  { label: 'Network', href: '/network' },
  { label: 'Revenue', href: '/revenue' },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppHeader() {
  const pathname = usePathname();
  const activeSection = sections.find((section) => isActive(pathname, section.href)) ?? sections[0];

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--amex-border)] bg-[color:var(--surface)]/92 px-[var(--app-header-padding-x)] py-[var(--app-header-padding-y)] shadow-[var(--shadow-sm)] backdrop-blur-xl">
      <div className="flex flex-col gap-[var(--app-header-gap)] xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <div className="mb-[var(--space-2)] flex flex-wrap items-center gap-[var(--space-2)]">
            <span className="inline-flex items-center gap-[var(--space-1)] rounded-full border border-[var(--amex-border)] bg-primary/10 px-[var(--space-3)] py-[var(--space-1)] text-[var(--text-caption)] font-bold uppercase tracking-[0.16em] text-primary">
              <Sparkles className="size-[var(--icon-sm)]" aria-hidden />
              Live portfolio view
            </span>
            <span className="inline-flex items-center gap-[var(--space-1)] rounded-full border border-[var(--amex-border)] bg-surface-muted/80 px-[var(--space-3)] py-[var(--space-1)] text-[var(--text-caption)] font-semibold uppercase tracking-[0.14em] text-text-muted">
              <CalendarClock className="size-[var(--icon-sm)]" aria-hidden />
              2026 planning cycle
            </span>
          </div>
          <div className="flex flex-wrap items-end gap-x-[var(--space-3)] gap-y-[var(--space-1)]">
            <h2 className="type-display text-[var(--text-header-title)] font-semibold leading-none tracking-tight text-foreground">
              Card business command center
            </h2>
            <p className="text-[var(--text-body-sm)] font-semibold text-text-muted">
              {activeSection.label}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[var(--space-3)] lg:flex-row lg:items-center">
          <label className="group flex min-w-0 items-center gap-[var(--space-2)] rounded-[var(--radius-control)] border border-[var(--amex-border)] bg-surface-muted/70 px-[var(--space-3)] py-[var(--space-2)] text-[var(--text-body-sm)] text-text-muted shadow-[var(--shadow-sm)] focus-within:border-primary">
            <Search className="size-[var(--icon-md)] shrink-0 text-primary" aria-hidden />
            <span className="sr-only">Search portfolio insights</span>
            <input
              type="search"
              placeholder="Search portfolio insights"
              className="w-full min-w-[14rem] bg-transparent font-medium text-foreground placeholder:text-text-muted focus:outline-none"
            />
          </label>

          <div className="flex flex-wrap items-center gap-[var(--space-2)]">
            <div className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-control)] border border-[var(--amex-border)] bg-surface px-[var(--space-3)] py-[var(--space-2)] text-[var(--text-body-sm)] font-semibold text-foreground shadow-[var(--shadow-sm)]">
              <span className="grid size-[var(--icon-lg)] place-items-center rounded-[var(--radius-control)] bg-success/10 text-success">
                <ShieldCheck className="size-[var(--icon-md)]" aria-hidden />
              </span>
              Risk normal
            </div>
            <div className="inline-flex items-center gap-[var(--space-2)] rounded-[var(--radius-control)] border border-[var(--amex-border)] bg-surface px-[var(--space-3)] py-[var(--space-2)] text-[var(--text-body-sm)] font-semibold text-foreground shadow-[var(--shadow-sm)]">
              <span className="grid size-[var(--icon-lg)] place-items-center rounded-[var(--radius-control)] bg-primary/10 text-primary">
                <BarChart3 className="size-[var(--icon-md)]" aria-hidden />
              </span>
              TTM view
            </div>
          </div>
        </div>
      </div>

      <nav
        className="mt-[var(--space-4)] flex gap-[var(--space-2)] overflow-x-auto pb-[var(--space-1)] xl:hidden"
        aria-label="Header sections"
      >
        {sections.map((section) => {
          const active = isActive(pathname, section.href);
          return (
            <Link
              key={section.href}
              href={section.href}
              aria-current={active ? 'page' : undefined}
              className={`shrink-0 rounded-full border px-[var(--space-3)] py-[var(--space-1)] text-[var(--text-body-sm)] font-semibold interactive-surface ${
                active
                  ? 'border-primary bg-primary text-white shadow-[var(--shadow-sm)]'
                  : 'border-[var(--amex-border)] bg-surface text-text-muted hover:border-[var(--amex-border-strong)] hover:text-foreground'
              }`}
            >
              {section.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
