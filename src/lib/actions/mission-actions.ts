"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin, type ActionResult } from "./guard";

const storySchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  location: z.string().trim().min(1, "Location is required."),
  date: z.string().min(1, "Date is required."),
  body: z.string().trim().min(1, "Story text is required."),
  order: z.coerce.number().int().min(0).default(0),
});

/**
 * Photos are entered one per line as:
 *   url | caption | location | YYYY-MM-DD
 * Only the URL is required.
 */
function parsePhotos(value: FormDataEntryValue | null) {
  if (!value) return [];
  return String(value)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, i) => {
      const [url, caption, location, date] = line.split("|").map((s) => s.trim());
      return {
        url,
        caption: caption || null,
        location: location || null,
        date: date ? new Date(date) : null,
        order: i,
      };
    })
    .filter((p) => p.url);
}

function parseForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    location: String(formData.get("location") ?? ""),
    date: String(formData.get("date") ?? ""),
    body: String(formData.get("body") ?? ""),
    order: Number(formData.get("order") ?? 0),
  };
}

export async function createMissionStory(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = storySchema.safeParse(parseForm(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  const d = parsed.data;
  const photos = parsePhotos(formData.get("photos"));

  await prisma.missionStory.create({
    data: {
      title: d.title,
      location: d.location,
      date: new Date(d.date),
      body: d.body,
      order: d.order,
      photos: { create: photos },
    },
  });

  revalidatePath("/mission");
  revalidatePath("/admin/mission");
  redirect("/admin/mission");
}

export async function updateMissionStory(
  id: string,
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = storySchema.safeParse(parseForm(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  const d = parsed.data;
  const photos = parsePhotos(formData.get("photos"));

  await prisma.missionPhoto.deleteMany({ where: { storyId: id } });
  await prisma.missionStory.update({
    where: { id },
    data: {
      title: d.title,
      location: d.location,
      date: new Date(d.date),
      body: d.body,
      order: d.order,
      photos: { create: photos },
    },
  });

  revalidatePath("/mission");
  revalidatePath("/admin/mission");
  redirect("/admin/mission");
}

export async function deleteMissionStory(id: string): Promise<void> {
  await requireAdmin();
  await prisma.missionStory.delete({ where: { id } });
  revalidatePath("/mission");
  revalidatePath("/admin/mission");
}
