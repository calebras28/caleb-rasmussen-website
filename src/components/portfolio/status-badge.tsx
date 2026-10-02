import { Badge } from "@/components/ui/badge";
import { statusColors, statusLabels } from "@/lib/labels";
import type { ProjectStatus } from "@/types/content";

export function StatusBadge({
  status,
  size = "sm",
}: {
  status: ProjectStatus;
  size?: "sm" | "md";
}) {
  return (
    <Badge color={statusColors[status]} size={size}>
      <span
        className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current"
        aria-hidden
      />
      {statusLabels[status]}
    </Badge>
  );
}
