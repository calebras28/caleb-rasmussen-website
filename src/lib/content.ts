import { prisma } from "@/lib/prisma";
import type {
  Education,
  Experience,
  MissionStory,
  NowItem,
  Project,
  ResumeSkill,
  SiteSettings,
} from "@/types/content";

import { siteSettings as placeholderSettings } from "@/lib/data/site";
import { projects as placeholderProjects } from "@/lib/data/projects";
import { nowItems as placeholderNow } from "@/lib/data/now";
import { missionStories as placeholderMission } from "@/lib/data/mission";
import { experiences as placeholderExp, education as placeholderEdu } from "@/lib/data/resume";
import { skills as placeholderSkills } from "@/lib/data/skills";

/**
 * Data-access layer. Every reader attempts the database first, then falls back
 * to bundled placeholder content when the DB is unreachable or empty. This
 * keeps the site working immediately after `git clone` while remaining a real
 * full-stack app once a database is connected and seeded.
 */

const iso = (d: Date | string) =>
  typeof d === "string" ? d : d.toISOString();

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[content] DB read failed, using placeholder data:", (error as Error).message);
    }
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return safe(async () => {
    const s = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });
    if (!s) return placeholderSettings;
    return {
      fullName: s.fullName,
      tagline: s.tagline,
      bio: s.bio,
      email: s.email,
      location: s.location,
      githubUrl: s.githubUrl,
      linkedinUrl: s.linkedinUrl,
      twitterUrl: s.twitterUrl,
      websiteUrl: s.websiteUrl,
      resumeUrl: s.resumeUrl,
      avatarUrl: s.avatarUrl,
    };
  }, placeholderSettings);
}

type ProjectWithRelations = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  problem: string | null;
  solution: string | null;
  features: string[];
  architecture: string | null;
  whatILearned: string | null;
  challenges: string | null;
  futureImprovements: string | null;
  category: Project["category"];
  status: Project["status"];
  githubUrl: string | null;
  liveUrl: string | null;
  coverImage: string | null;
  featured: boolean;
  order: number;
  date: Date;
  technologies: { technology: { name: string } }[];
  images: { url: string; alt: string }[];
};

function mapProject(p: ProjectWithRelations): Project {
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    description: p.description,
    problem: p.problem,
    solution: p.solution,
    features: p.features,
    architecture: p.architecture,
    whatILearned: p.whatILearned,
    challenges: p.challenges,
    futureImprovements: p.futureImprovements,
    category: p.category,
    status: p.status,
    githubUrl: p.githubUrl,
    liveUrl: p.liveUrl,
    coverImage: p.coverImage,
    featured: p.featured,
    order: p.order,
    date: iso(p.date),
    technologies: p.technologies.map((t) => t.technology.name),
    images: p.images.map((i) => ({ url: i.url, alt: i.alt })),
  };
}

export async function getProjects(): Promise<Project[]> {
  return safe(async () => {
    const rows = await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { date: "desc" }],
      include: {
        technologies: { include: { technology: true } },
        images: { orderBy: { order: "asc" } },
      },
    });
    if (rows.length === 0) return placeholderProjects;
    return rows.map((r) => mapProject(r as unknown as ProjectWithRelations));
  }, placeholderProjects);
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const all = await getProjects();
  const featured = all.filter((p) => p.featured);
  return (featured.length > 0 ? featured : all).slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return safe(async () => {
    const row = await prisma.project.findUnique({
      where: { slug },
      include: {
        technologies: { include: { technology: true } },
        images: { orderBy: { order: "asc" } },
      },
    });
    if (!row) {
      return placeholderProjects.find((p) => p.slug === slug) ?? null;
    }
    return mapProject(row as unknown as ProjectWithRelations);
  }, placeholderProjects.find((p) => p.slug === slug) ?? null);
}

export async function getProjectSlugs(): Promise<string[]> {
  return safe(async () => {
    const rows = await prisma.project.findMany({ select: { slug: true } });
    if (rows.length === 0) return placeholderProjects.map((p) => p.slug);
    return rows.map((r) => r.slug);
  }, placeholderProjects.map((p) => p.slug));
}

export async function getNowItems(): Promise<NowItem[]> {
  return safe(async () => {
    const rows = await prisma.nowItem.findMany({
      orderBy: [{ order: "asc" }, { updatedAt: "desc" }],
    });
    if (rows.length === 0) return placeholderNow;
    return rows.map((r) => ({
      title: r.title,
      description: r.description,
      status: r.status,
      progress: r.progress,
      technologies: r.technologies,
      goals: r.goals,
      updatedAt: iso(r.updatedAt),
    }));
  }, placeholderNow);
}

export async function getMissionStories(): Promise<MissionStory[]> {
  return safe(async () => {
    const rows = await prisma.missionStory.findMany({
      orderBy: [{ order: "asc" }, { date: "asc" }],
      include: { photos: { orderBy: { order: "asc" } } },
    });
    if (rows.length === 0) return placeholderMission;
    return rows.map((r) => ({
      title: r.title,
      location: r.location,
      date: iso(r.date),
      body: r.body,
      photos: r.photos.map((ph) => ({
        url: ph.url,
        caption: ph.caption,
        location: ph.location,
        date: ph.date ? iso(ph.date) : null,
        width: ph.width ?? undefined,
        height: ph.height ?? undefined,
      })),
    }));
  }, placeholderMission);
}

export async function getExperiences(): Promise<Experience[]> {
  return safe(async () => {
    const rows = await prisma.experience.findMany({
      orderBy: [{ order: "asc" }, { startDate: "desc" }],
    });
    if (rows.length === 0) return placeholderExp;
    return rows.map((r) => ({
      role: r.role,
      company: r.company,
      location: r.location,
      startDate: iso(r.startDate),
      endDate: r.endDate ? iso(r.endDate) : null,
      current: r.current,
      description: r.description,
      highlights: r.highlights,
    }));
  }, placeholderExp);
}

export async function getEducation(): Promise<Education[]> {
  return safe(async () => {
    const rows = await prisma.education.findMany({
      orderBy: [{ order: "asc" }, { startDate: "desc" }],
    });
    if (rows.length === 0) return placeholderEdu;
    return rows.map((r) => ({
      school: r.school,
      degree: r.degree,
      field: r.field,
      location: r.location,
      startDate: iso(r.startDate),
      endDate: r.endDate ? iso(r.endDate) : null,
      current: r.current,
      description: r.description,
      highlights: r.highlights,
    }));
  }, placeholderEdu);
}

export async function getSkills(): Promise<ResumeSkill[]> {
  return safe(async () => {
    const rows = await prisma.resumeSkill.findMany({
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });
    if (rows.length === 0) return placeholderSkills;
    return rows.map((r) => ({ category: r.category, name: r.name, level: r.level }));
  }, placeholderSkills);
}
