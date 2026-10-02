import Link from "next/link";
import { Plus, Pencil, MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { deleteMissionStory } from "@/lib/actions/mission-actions";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

async function getStories() {
  try {
    return await prisma.missionStory.findMany({
      orderBy: [{ order: "asc" }, { date: "asc" }],
      include: { _count: { select: { photos: true } } },
    });
  } catch {
    return [];
  }
}

export default async function AdminMissionPage() {
  const stories = await getStories();

  return (
    <>
      <AdminHeader title="Mission stories" description="Manage your mission timeline and photos.">
        <Button href="/admin/mission/new" variant="accent">
          <Plus className="h-4 w-4" /> New story
        </Button>
      </AdminHeader>

      {stories.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="font-display text-lg font-bold">No stories yet</p>
          <Button href="/admin/mission/new" variant="accent" className="mt-4">
            <Plus className="h-4 w-4" /> New story
          </Button>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {stories.map((s) => (
            <Card key={s.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <h2 className="font-display font-bold">{s.title}</h2>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <Badge size="sm" color="blue">
                    <MapPin className="h-3 w-3" /> {s.location}
                  </Badge>
                  <Badge size="sm" color="yellow">
                    {formatDate(s.date)}
                  </Badge>
                  <span className="font-mono text-xs text-muted">
                    {s._count.photos} photo{s._count.photos === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/mission/${s.id}`}
                  className="border-brutal shadow-brutal-sm hover-brutal inline-flex items-center gap-1.5 bg-surface px-3 py-1.5 text-sm font-bold"
                >
                  <Pencil className="h-4 w-4" /> Edit
                </Link>
                <DeleteButton action={deleteMissionStory.bind(null, s.id)} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
