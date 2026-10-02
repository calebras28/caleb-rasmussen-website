import { ProjectCard } from "./project-card";
import type { Project } from "@/types/content";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="border-brutal shadow-brutal grid place-items-center bg-surface p-12 text-center">
        <p className="font-display text-lg font-bold">No projects found</p>
        <p className="mt-1 text-sm text-muted">
          Try adjusting your filters, or check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
