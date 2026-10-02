"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Clock,
  Image as ImageIcon,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/actions/auth-actions";

const links = [
  { href: "/admin", label: "Overview", Icon: LayoutDashboard, exact: true },
  { href: "/admin/projects", label: "Projects", Icon: FolderKanban },
  { href: "/admin/now", label: "Now", Icon: Clock },
  { href: "/admin/mission", label: "Mission", Icon: ImageIcon },
  { href: "/admin/resume", label: "Resume", Icon: FileText },
  { href: "/admin/messages", label: "Messages", Icon: MessageSquare },
  { href: "/admin/settings", label: "Settings", Icon: Settings },
];

export function AdminSidebar({
  userEmail,
  unreadCount,
}: {
  userEmail?: string | null;
  unreadCount?: number;
}) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <aside className="flex flex-col gap-4 lg:h-[calc(100vh-1.5rem)] lg:sticky lg:top-3">
      <div className="border-brutal shadow-brutal bg-surface p-4">
        <Link href="/admin" className="flex items-center gap-2 font-display font-black">
          <span className="grid h-8 w-8 place-items-center border-brutal bg-accent text-accent-foreground text-sm">
            {"</>"}
          </span>
          Admin
        </Link>
      </div>

      <nav className="border-brutal shadow-brutal flex flex-1 flex-col gap-1 bg-surface p-3">
        {links.map(({ href, label, Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 border-2 border-transparent px-3 py-2 font-medium transition-colors hover:bg-surface-alt",
              isActive(href, exact) &&
                "border-brutal bg-accent text-accent-foreground shadow-brutal-sm hover:bg-accent",
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="flex-1">{label}</span>
            {label === "Messages" && unreadCount ? (
              <span className="grid h-5 min-w-5 place-items-center border-2 border-border bg-brand-red px-1 text-xs font-bold text-white">
                {unreadCount}
              </span>
            ) : null}
          </Link>
        ))}

        <div className="mt-auto flex flex-col gap-1 border-t-[3px] border-border pt-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" /> View site
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-brand-red hover:underline"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </form>
        </div>
      </nav>

      {userEmail ? (
        <p className="truncate px-1 font-mono text-xs text-muted">{userEmail}</p>
      ) : null}
    </aside>
  );
}
