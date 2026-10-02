import { cn } from "@/lib/utils";

type BadgeColor =
  | "default"
  | "blue"
  | "yellow"
  | "red"
  | "lime"
  | "purple"
  | "pink";

const colors: Record<BadgeColor, string> = {
  default: "bg-surface text-foreground",
  blue: "bg-brand-blue text-white",
  yellow: "bg-brand-yellow text-ink",
  red: "bg-brand-red text-white",
  lime: "bg-brand-lime text-ink",
  purple: "bg-brand-purple text-ink",
  pink: "bg-brand-pink text-ink",
};

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: BadgeColor;
  size?: "sm" | "md";
}

export function Badge({
  className,
  color = "default",
  size = "md",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 border-brutal font-mono font-semibold uppercase tracking-wide",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        colors[color],
        className,
      )}
      {...props}
    />
  );
}
