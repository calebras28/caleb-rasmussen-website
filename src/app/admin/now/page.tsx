import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { StatusBadge } from "@/components/portfolio/status-badge";
import { ProgressBar } from "@/components/portfolio/progress-bar";
import { deleteNowItem } from "@/lib/actions/now-actions";
import { prisma } from "@/lib/prisma";
import type { ProjectStatus } from "@/types/content";

async function getItems() {
  try {
    return await prisma.nowItem.findMany({
      orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function AdminNowPage() {
  const items = await getItems();

  return (
    <>
      <AdminHeader title="Currently working on" description="Keep your /now page fresh.">
        <Button href="/admin/now/new" variant="accent">
          <Plus className="h-4 w-4" /> New item
        </Button>
      </AdminHeader>

      {items.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="font-display text-lg font-bold">Nothing here yet</p>
          <Button href="/admin/now/new" variant="accent" className="mt-4">
            <Plus className="h-4 w-4" /> New item
          </Button>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <Card key={item.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-bold">{item.title}</h2>
                  <StatusBadge status={item.status as ProjectStatus} />
                </div>
                <p className="truncate text-sm text-muted">{item.description}</p>
                <ProgressBar value={item.progress} className="mt-2 max-w-xs" />
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/now/${item.id}`}
                  className="border-brutal shadow-brutal-sm hover-brutal inline-flex items-center gap-1.5 bg-surface px-3 py-1.5 text-sm font-bold"
                >
                  <Pencil className="h-4 w-4" /> Edit
                </Link>
                <DeleteButton action={deleteNowItem.bind(null, item.id)} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
