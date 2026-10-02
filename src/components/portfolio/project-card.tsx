import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "./status-badge";
import { TechnologyList } from "./technology-badge";
import { categoryColors, categoryLabels } from "@/lib/labels";
import type { Project } from "@/types/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      as="article"
      interactive
      className="group flex flex-col overflow-hidden"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="relative block aspect-[16/10] overflow-hidden border-b-[3px] border-border"
        aria-label={`View ${project.title}`}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={`${project.title} cover`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center bg-surface-alt font-display text-4xl font-black text-muted">
            {project.title.charAt(0)}
          </div>
        )}
        {project.featured ? (
          <span className="absolute left-3 top-3">
            <Badge color="yellow">★ Featured</Badge>
          </span>
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge color={categoryColors[project.category]}>
            {categoryLabels[project.category]}
          </Badge>
          <StatusBadge status={project.status} />
        </div>

        <Link href={`/projects/${project.slug}`}>
          <h3 className="font-display text-xl font-bold transition-colors group-hover:text-accent">
            {project.title}
          </h3>
        </Link>

        <p className="flex-1 text-sm text-muted">{project.summary}</p>

        <TechnologyList items={project.technologies} max={4} />

        <div className="mt-2 flex items-center gap-3 border-t-[3px] border-border pt-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 font-display text-sm font-bold hover:text-accent"
          >
            Take me there <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex items-center gap-1 text-sm text-muted hover:text-foreground"
              aria-label={`${project.title} on GitHub`}
            >
              <GithubIcon className="h-4 w-4" aria-hidden /> Code
            </a>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
