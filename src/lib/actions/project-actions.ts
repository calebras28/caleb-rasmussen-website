"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";
import { requireAdmin, type ActionResult } from "./guard";

/** Split a textarea value into a trimmed, non-empty string array. */
function parseLines(value: FormDataEntryValue | null): string[] {
  if (!value) return [];
  return String(value)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    description: String(formData.get("description") ?? ""),
    problem: String(formData.get("problem") ?? ""),
    solution: String(formData.get("solution") ?? ""),
    features: parseLines(formData.get("features")),
    architecture: String(formData.get("architecture") ?? ""),
    whatILearned: String(formData.get("whatILearned") ?? ""),
    challenges: String(formData.get("challenges") ?? ""),
    futureImprovements: String(formData.get("futureImprovements") ?? ""),
    category: String(formData.get("category") ?? "FULLSTACK"),
    status: String(formData.get("status") ?? "COMPLETED"),
    githubUrl: String(formData.get("githubUrl") ?? ""),
    liveUrl: String(formData.get("liveUrl") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    featured: formData.get("featured") === "on" || formData.get("featured") === "true",
    order: Number(formData.get("order") ?? 0),
    date: String(formData.get("date") ?? ""),
    technologies: parseLines(formData.get("technologies")),
  };
}

async function connectTechnologies(projectId: string, names: string[]) {
  await prisma.projectTechnology.deleteMany({ where: { projectId } });
  for (const name of names) {
    const tech = await prisma.technology.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    await prisma.projectTechnology.create({
      data: { projectId, technologyId: tech.id },
    });
  }
}

export async function createProject(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = projectSchema.safeParse(parseForm(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  const d = parsed.data;

  const existing = await prisma.project.findUnique({ where: { slug: d.slug } });
  if (existing) {
    return { ok: false, error: "A project with that slug already exists." };
  }

  const created = await prisma.project.create({
    data: {
      slug: d.slug,
      title: d.title,
      summary: d.summary,
      description: d.description,
      problem: d.problem || null,
      solution: d.solution || null,
      features: d.features,
      architecture: d.architecture || null,
      whatILearned: d.whatILearned || null,
      challenges: d.challenges || null,
      futureImprovements: d.futureImprovements || null,
      category: d.category,
      status: d.status,
      githubUrl: d.githubUrl || null,
      liveUrl: d.liveUrl || null,
      coverImage: d.coverImage || null,
      featured: d.featured,
      order: d.order,
      date: new Date(d.date),
    },
  });

  await connectTechnologies(created.id, d.technologies);

  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = projectSchema.safeParse(parseForm(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  const d = parsed.data;

  const clash = await prisma.project.findFirst({
    where: { slug: d.slug, NOT: { id } },
  });
  if (clash) {
    return { ok: false, error: "Another project already uses that slug." };
  }

  await prisma.project.update({
    where: { id },
    data: {
      slug: d.slug,
      title: d.title,
      summary: d.summary,
      description: d.description,
      problem: d.problem || null,
      solution: d.solution || null,
      features: d.features,
      architecture: d.architecture || null,
      whatILearned: d.whatILearned || null,
      challenges: d.challenges || null,
      futureImprovements: d.futureImprovements || null,
      category: d.category,
      status: d.status,
      githubUrl: d.githubUrl || null,
      liveUrl: d.liveUrl || null,
      coverImage: d.coverImage || null,
      featured: d.featured,
      order: d.order,
      date: new Date(d.date),
    },
  });

  await connectTechnologies(id, d.technologies);

  revalidatePath("/projects");
  revalidatePath(`/projects/${d.slug}`);
  revalidatePath("/admin/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string): Promise<void> {
  await requireAdmin();
  await prisma.project.delete({ where: { id } });
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
  revalidatePath("/");
}
