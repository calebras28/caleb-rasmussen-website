import { notFound } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { Card } from "@/components/ui/card";
import { MissionForm, type MissionFormData } from "@/components/admin/mission-form";
import { updateMissionStory } from "@/lib/actions/mission-actions";
import { prisma } from "@/lib/prisma";

function serializePhotos(
  photos: {
    url: string;
    caption: string | null;
    location: string | null;
    date: Date | null;
  }[],
): string {
  return photos
    .map((p) =>
      [p.url, p.caption ?? "", p.location ?? "", p.date ? p.date.toISOString().slice(0, 10) : ""]
        .join(" | ")
        .replace(/(\s\|\s)+$/, ""),
    )
    .join("\n");
}

async function getStory(id: string): Promise<MissionFormData | null> {
  try {
    const s = await prisma.missionStory.findUnique({
      where: { id },
      include: { photos: { orderBy: { order: "asc" } } },
    });
    if (!s) return null;
    return {
      title: s.title,
      location: s.location,
      date: s.date.toISOString().slice(0, 10),
      body: s.body,
      order: s.order,
      photos: serializePhotos(s.photos),
    };
  } catch {
    return null;
  }
}

export default async function EditMissionStoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = await getStory(id);
  if (!story) notFound();

  const action = updateMissionStory.bind(null, id);

  return (
    <>
      <AdminHeader title="Edit mission story" description={story.title} />
      <Card className="p-6">
        <MissionForm action={action} story={story} submitLabel="Save changes" />
      </Card>
    </>
  );
}
