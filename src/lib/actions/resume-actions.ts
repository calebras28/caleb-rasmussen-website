"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "./guard";

function lines(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return String(value)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function revalidateResume() {
  revalidatePath("/resume");
  revalidatePath("/admin/resume");
}

// ---- Experience ----------------------------------------------------------
export async function addExperience(formData: FormData): Promise<void> {
  await requireAdmin();
  const current = formData.get("current") === "on";
  await prisma.experience.create({
    data: {
      role: String(formData.get("role") ?? ""),
      company: String(formData.get("company") ?? ""),
      location: String(formData.get("location") ?? "") || null,
      startDate: new Date(String(formData.get("startDate"))),
      endDate: current ? null : new Date(String(formData.get("endDate") || formData.get("startDate"))),
      current,
      description: String(formData.get("description") ?? ""),
      highlights: lines(formData.get("highlights")),
      order: Number(formData.get("order") ?? 0),
    },
  });
  revalidateResume();
}

export async function deleteExperience(id: string): Promise<void> {
  await requireAdmin();
  await prisma.experience.delete({ where: { id } });
  revalidateResume();
}

// ---- Education -----------------------------------------------------------
export async function addEducation(formData: FormData): Promise<void> {
  await requireAdmin();
  const current = formData.get("current") === "on";
  await prisma.education.create({
    data: {
      school: String(formData.get("school") ?? ""),
      degree: String(formData.get("degree") ?? ""),
      field: String(formData.get("field") ?? "") || null,
      location: String(formData.get("location") ?? "") || null,
      startDate: new Date(String(formData.get("startDate"))),
      endDate: current ? null : new Date(String(formData.get("endDate") || formData.get("startDate"))),
      current,
      description: String(formData.get("description") ?? "") || null,
      highlights: lines(formData.get("highlights")),
      order: Number(formData.get("order") ?? 0),
    },
  });
  revalidateResume();
}

export async function deleteEducation(id: string): Promise<void> {
  await requireAdmin();
  await prisma.education.delete({ where: { id } });
  revalidateResume();
}

// ---- Skills --------------------------------------------------------------
export async function addSkill(formData: FormData): Promise<void> {
  await requireAdmin();
  await prisma.resumeSkill.create({
    data: {
      category: String(formData.get("category") ?? "General"),
      name: String(formData.get("name") ?? ""),
      level: Number(formData.get("level") ?? 3),
      order: Number(formData.get("order") ?? 0),
    },
  });
  revalidateResume();
}

export async function deleteSkill(id: string): Promise<void> {
  await requireAdmin();
  await prisma.resumeSkill.delete({ where: { id } });
  revalidateResume();
}
