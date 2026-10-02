import { Container } from "./container";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="border-b-[3px] border-border bg-surface-alt bg-grid">
      <Container className="py-14 md:py-20">
        {eyebrow ? (
          <span className="mb-4 inline-flex w-fit border-brutal bg-accent px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-accent-foreground shadow-brutal-sm">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="max-w-4xl font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-lg text-muted">{description}</p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </Container>
    </section>
  );
}
