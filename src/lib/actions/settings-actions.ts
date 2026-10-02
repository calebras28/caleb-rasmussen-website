"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { siteSettingsSchema } from "@/lib/validations";
import { requireAdmin, type ActionResult } from "./guard";

function parseForm(formData: FormData) {
  return {
    fullName: String(formData.get("fullName") ?? ""),
    tagline: String(formData.get("tagline") ?? ""),
    bio: String(formData.get("bio") ?? ""),
    email: String(formData.get("email") ?? ""),
    location: String(formData.get("location") ?? ""),
    githubUrl: String(formData.get("githubUrl") ?? ""),
    linkedinUrl: String(formData.get("linkedinUrl") ?? ""),
    twitterUrl: String(formData.get("twitterUrl") ?? ""),
    websiteUrl: String(formData.get("websiteUrl") ?? ""),
    resumeUrl: String(formData.get("resumeUrl") ?? ""),
    avatarUrl: String(formData.get("avatarUrl") ?? ""),
  };
}

export async function updateSettings(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  await requireAdmin();
  const parsed = siteSettingsSchema.safeParse(parseForm(formData));
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  const d = parsed.data;
  const data = {
    fullName: d.fullName,
    tagline: d.tagline,
    bio: d.bio,
    email: d.email,
    location: d.location || null,
    githubUrl: d.githubUrl || null,
    linkedinUrl: d.linkedinUrl || null,
    twitterUrl: d.twitterUrl || null,
    websiteUrl: d.websiteUrl || null,
    resumeUrl: d.resumeUrl || null,
    avatarUrl: d.avatarUrl || null,
  };

  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  revalidatePath("/", "layout");
  return { ok: true };
}
