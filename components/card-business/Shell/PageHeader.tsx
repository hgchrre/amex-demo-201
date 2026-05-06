interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-8">
      {eyebrow ? (
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary mb-2">{eyebrow}</p>
      ) : null}
      <h1 className="type-display text-[1.65rem] sm:text-[1.85rem] font-semibold text-foreground tracking-tight leading-tight mb-2">
        {title}
      </h1>
      {description ? (
        <p className="text-sm text-text-muted max-w-2xl leading-relaxed">{description}</p>
      ) : null}
    </header>
  );
}
