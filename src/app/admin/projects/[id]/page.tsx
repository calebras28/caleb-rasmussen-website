import { notFound } from "next/navigation";

import { AdminHeader } from "@/components/admin/admin-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProjectForm } from "@/components/admin/project-form";
import { updateProject } from "@/lib/actions/project-actions";
import { prisma } from "@/lib/prisma";
import type { Project, ProjectCategory, ProjectStatus } from "@/types/content";

async function getProject(id: string): Promise<Project | null> {
  try {
    const p = await prisma.project.findUnique({
      where: { id },
      include: {
        technologies: { include: { technology: true } },
        images: { orderBy: { order: "asc" } },
      },
    });
    if (!p) return null;
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
      category: p.category as ProjectCategory,
      status: p.status as ProjectStatus,
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      coverImage: p.coverImage,
      featured: p.featured,
      order: p.order,
      date: p.date.toISOString(),
      technologies: p.technologies.map((t) => t.technology.name),
      images: p.images.map((i) => ({ url: i.url, alt: i.alt })),
    };
  } catch {
    return null;
  }
}

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  const action = updateProject.bind(null, id);

  return (
    <>
      <AdminHeader title="Edit project" description={project.title}>
        <Button href={`/projects/${project.slug}`} variant="secondary">
          View live
        </Button>
      </AdminHeader>
      <Card className="p-6">
        <ProjectForm action={action} project={project} submitLabel="Save changes" />
      </Card>
    </>
  );
}
