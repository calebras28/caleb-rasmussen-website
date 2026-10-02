import Link from "next/link";
import {
  FolderKanban,
  Clock,
  Image as ImageIcon,
  MessageSquare,
  Plus,
  ArrowUpRight,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/components/admin/admin-header";
import { prisma } from "@/lib/prisma";
import { timeAgo } from "@/lib/utils";

async function getStats() {
  try {
    const [projects, featured, nowItems, stories, messages, unread] =
      await Promise.all([
        prisma.project.count(),
        prisma.project.count({ where: { featured: true } }),
        prisma.nowItem.count(),
        prisma.missionStory.count(),
        prisma.contactMessage.count(),
        prisma.contactMessage.count({ where: { read: false } }),
      ]);
    const recent = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });
    return { projects, featured, nowItems, stories, messages, unread, recent };
  } catch {
    return {
      projects: 0,
      featured: 0,
      nowItems: 0,
      stories: 0,
      messages: 0,
      unread: 0,
      recent: [] as {
        id: string;
        name: string;
        email: string;
        message: string;
        read: boolean;
        createdAt: Date;
      }[],
      dbError: true,
    };
  }
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      sub: `${stats.featured} featured`,
      href: "/admin/projects",
      Icon: FolderKanban,
    },
    {
      label: "Now items",
      value: stats.nowItems,
      sub: "Currently working on",
      href: "/admin/now",
      Icon: Clock,
    },
    {
      label: "Mission stories",
      value: stats.stories,
      sub: "With photos",
      href: "/admin/mission",
      Icon: ImageIcon,
    },
    {
      label: "Messages",
      value: stats.messages,
      sub: `${stats.unread} unread`,
      href: "/admin/messages",
      Icon: MessageSquare,
    },
  ];

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Manage your portfolio content from one place."
      >
        <Button href="/admin/projects/new" variant="accent">
          <Plus className="h-4 w-4" /> New project
        </Button>
      </AdminHeader>

      {"dbError" in stats && stats.dbError ? (
        <Card className="mb-6 bg-brand-yellow p-4 text-ink">
          <p className="font-bold">Database not connected</p>
          <p className="text-sm">
            The public site is showing bundled placeholder content. Set
            <code className="mx-1 font-mono">DATABASE_URL</code>, run migrations,
            and seed to enable content management.
          </p>
        </Card>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, sub, href, Icon }) => (
          <Link key={label} href={href}>
            <Card interactive className="p-5">
              <div className="flex items-center justify-between">
                <span className="grid h-10 w-10 place-items-center border-brutal bg-accent text-accent-foreground shadow-brutal-sm">
                  <Icon className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted" />
              </div>
              <p className="mt-4 font-display text-3xl font-black">{value}</p>
              <p className="font-semibold">{label}</p>
              <p className="text-xs text-muted">{sub}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-xl font-black">Recent messages</h2>
          <Link
            href="/admin/messages"
            className="text-sm font-semibold hover:underline"
          >
            View all →
          </Link>
        </div>
        {stats.recent.length === 0 ? (
          <Card className="p-6 text-sm text-muted">No messages yet.</Card>
        ) : (
          <div className="flex flex-col gap-2">
            {stats.recent.map((m) => (
              <Card key={m.id} className="flex items-center gap-4 p-4">
                <span
                  className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                    m.read ? "bg-muted" : "bg-brand-red"
                  }`}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">
                    {m.name}{" "}
                    <span className="font-normal text-muted">· {m.email}</span>
                  </p>
                  <p className="truncate text-sm text-muted">{m.message}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {timeAgo(m.createdAt)}
                </span>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
