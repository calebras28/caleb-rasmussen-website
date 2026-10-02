import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminHeader } from "@/components/admin/admin-header";
import { DeleteButton } from "@/components/admin/delete-button";
import { StatusBadge } from "@/components/portfolio/status-badge";
import { deleteProject } from "@/lib/actions/project-actions";
import { prisma } from "@/lib/prisma";
import { categoryLabels } from "@/lib/labels";
import type { ProjectCategory, ProjectStatus } from "@/types/content";

async function getAdminProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: [{ order: "asc" }, { date: "desc" }],
    });
  } catch {
    return [];
  }
}

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <>
      <AdminHeader title="Projects" description="Create, edit, and organize your projects.">
        <Button href="/admin/projects/new" variant="accent">
          <Plus className="h-4 w-4" /> New project
        </Button>
      </AdminHeader>

      {projects.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="font-display text-lg font-bold">No projects yet</p>
          <p className="mt-1 text-sm text-muted">
            Create your first project to see it on the public site.
          </p>
          <Button href="/admin/projects/new" variant="accent" className="mt-4">
            <Plus className="h-4 w-4" /> New project
          </Button>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((p) => (
            <Card key={p.id} className="flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-display font-bold">{p.title}</h2>
                  {p.featured ? (
                    <Badge color="yellow" size="sm">
                      <Star className="h-3 w-3" /> Featured
                    </Badge>
                  ) : null}
                </div>
                <p className="truncate text-sm text-muted">{p.summary}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  <Badge size="sm">{categoryLabels[p.category as ProjectCategory]}</Badge>
                  <StatusBadge status={p.status as ProjectStatus} />
                  <span className="font-mono text-xs text-muted">/{p.slug}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/projects/${p.id}`}
                  className="border-brutal shadow-brutal-sm hover-brutal inline-flex items-center gap-1.5 bg-surface px-3 py-1.5 text-sm font-bold"
                >
                  <Pencil className="h-4 w-4" /> Edit
                </Link>
                <DeleteButton action={deleteProject.bind(null, p.id)} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
