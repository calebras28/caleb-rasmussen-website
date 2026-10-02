import { cn } from "@/lib/utils";

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  meta?: string;
  location?: string | null;
  description?: string | null;
  highlights?: string[];
  children?: React.ReactNode;
}

export function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <ol className="relative flex flex-col gap-8 border-l-[3px] border-border pl-6 sm:pl-8">
      {children}
    </ol>
  );
}

export function TimelineItem({
  title,
  subtitle,
  meta,
  location,
  description,
  highlights,
  children,
}: TimelineItemProps) {
  return (
    <li className="relative">
      <span
        className="absolute -left-[calc(1.5rem+8px)] top-1.5 h-4 w-4 border-brutal bg-accent sm:-left-[calc(2rem+8px)]"
        aria-hidden
      />
      <div className="flex flex-col gap-1">
        {meta ? (
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
            {meta}
          </span>
        ) : null}
        <h3 className="font-display text-lg font-bold sm:text-xl">{title}</h3>
        {subtitle ? (
          <p className="text-sm font-semibold text-muted">
            {subtitle}
            {location ? (
              <span className="font-normal"> · {location}</span>
            ) : null}
          </p>
        ) : null}
        {description ? (
          <p className="mt-1 text-sm text-muted">{description}</p>
        ) : null}
        {highlights && highlights.length > 0 ? (
          <ul className={cn("mt-2 flex flex-col gap-1.5")}>
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm">
                <span className="mt-1 shrink-0 text-accent">▹</span>
                {h}
              </li>
            ))}
          </ul>
        ) : null}
        {children}
      </div>
    </li>
  );
}
