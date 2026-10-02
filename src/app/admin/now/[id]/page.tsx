import { notFound } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { Card } from "@/components/ui/card";
import { NowForm, type NowFormData } from "@/components/admin/now-form";
import { updateNowItem } from "@/lib/actions/now-actions";
import { prisma } from "@/lib/prisma";

async function getItem(id: string): Promise<NowFormData | null> {
  try {
    const item = await prisma.nowItem.findUnique({ where: { id } });
    if (!item) return null;
    return {
      title: item.title,
      description: item.description,
      status: item.status,
      progress: item.progress,
      technologies: item.technologies,
      goals: item.goals,
      order: item.order,
    };
  } catch {
    return null;
  }
}

export default async function EditNowItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getItem(id);
  if (!item) notFound();

  const action = updateNowItem.bind(null, id);

  return (
    <>
      <AdminHeader title="Edit item" description={item.title} />
      <Card className="p-6">
        <NowForm action={action} item={item} submitLabel="Save changes" />
      </Card>
    </>
  );
}
