import { cn } from "@/lib/utils";

/** A continuously scrolling strip. Duplicates children for a seamless loop. */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden border-y-[3px] border-border bg-ink py-4 text-paper dark:bg-paper dark:text-ink",
        className,
      )}
    >
      <div className="marquee-track flex shrink-0 gap-8 pr-8 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 font-display text-xl font-bold uppercase tracking-tight"
            aria-hidden={i >= items.length}
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
