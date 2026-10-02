"use client";

import { useState, useTransition } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function DeleteButton({
  action,
  label = "Delete",
  confirmMessage = "Are you sure? This cannot be undone.",
  className,
  iconOnly = false,
}: {
  action: () => Promise<void>;
  label?: string;
  confirmMessage?: string;
  className?: string;
  iconOnly?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const [confirming, setConfirming] = useState(false);

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true);
      setTimeout(() => setConfirming(false), 3000);
      return;
    }
    startTransition(async () => {
      await action();
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      aria-label={label}
      className={cn(
        "border-brutal shadow-brutal-sm hover-brutal inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold",
        confirming
          ? "bg-brand-red text-white"
          : "bg-surface text-brand-red",
        className,
      )}
    >
      {pending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
      {iconOnly ? null : confirming ? "Confirm?" : label}
    </button>
  );
}
