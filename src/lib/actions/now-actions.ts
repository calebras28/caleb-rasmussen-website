"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { nowItemSchema } from "@/lib/validations";
import { requireAdmin, type ActionResult } from "./guard";

function parseForm(formData: FormData) {
  return {
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    status: String(formData.get("status") ?? "IN_DEVELOPMENT"),
    progress: Number(formData.get("progress") ?? 0),
    technologies: String(formData.get("technologies") ?? "")
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean),
    goals: String(formData.get("goals") ?? ""),
    order: Number(formData.get("order") ?? 0),
  };
}

export async function createNowItem(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = nowItemSchema.safeParse(parseForm(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  const d = parsed.data;
  await prisma.nowItem.create({
    data: {
      title: d.title,
      description: d.description,
      status: d.status,
      progress: d.progress,
      technologies: d.technologies,
      goals: d.goals || null,
      order: d.order,
    },
  });
  revalidatePath("/now");
  revalidatePath("/admin/now");
  revalidatePath("/");
  redirect("/admin/now");
}

export async function updateNowItem(
  id: string,
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = nowItemSchema.safeParse(parseForm(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  const d = parsed.data;
  await prisma.nowItem.update({
    where: { id },
    data: {
      title: d.title,
      description: d.description,
      status: d.status,
      progress: d.progress,
      technologies: d.technologies,
      goals: d.goals || null,
      order: d.order,
    },
  });
  revalidatePath("/now");
  revalidatePath("/admin/now");
  revalidatePath("/");
  redirect("/admin/now");
}

export async function deleteNowItem(id: string): Promise<void> {
  await requireAdmin();
  await prisma.nowItem.delete({ where: { id } });
  revalidatePath("/now");
  revalidatePath("/admin/now");
  revalidatePath("/");
}
