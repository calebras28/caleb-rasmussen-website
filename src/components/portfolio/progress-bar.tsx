import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  className,
  label,
}: {
  value: number;
  className?: string;
  label?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center justify-between font-mono text-xs font-semibold">
        <span>{label ?? "Progress"}</span>
        <span>{clamped}%</span>
      </div>
      <div
        className="border-brutal h-4 w-full bg-surface"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? "Progress"}
      >
        <div
          className="h-full bg-accent transition-[width] duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
