import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TechnologyBadge({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md";
}) {
  return (
    <Badge size={size} className="normal-case tracking-normal">
      {name}
    </Badge>
  );
}

export function TechnologyList({
  items,
  size = "sm",
  max,
  className,
}: {
  items: string[];
  size?: "sm" | "md";
  max?: number;
  className?: string;
}) {
  const shown = max ? items.slice(0, max) : items;
  const remaining = max ? items.length - shown.length : 0;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {shown.map((t) => (
        <TechnologyBadge key={t} name={t} size={size} />
      ))}
      {remaining > 0 ? (
        <Badge size={size} color="default" className="normal-case tracking-normal">
          +{remaining} more
        </Badge>
      ) : null}
    </div>
  );
}
