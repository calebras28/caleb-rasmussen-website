import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names with conditional logic. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a date range into a compact, human-readable string. */
export function formatDateRange(
  start: Date | string,
  end?: Date | string | null,
  current = false,
): string {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    });
  const startStr = fmt(new Date(start));
  if (current) return `${startStr} — Present`;
  if (!end) return startStr;
  return `${startStr} — ${fmt(new Date(end))}`;
}

/** Format a single date. */
export function formatDate(
  date: Date | string,
  opts: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" },
): string {
  return new Date(date).toLocaleDateString("en-US", { timeZone: "UTC", ...opts });
}

/** Convert an arbitrary string into a URL-friendly slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Relative "time ago" formatting for small metadata labels. */
export function timeAgo(date: Date | string): string {
  const d = new Date(date);
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [604800, "week"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
