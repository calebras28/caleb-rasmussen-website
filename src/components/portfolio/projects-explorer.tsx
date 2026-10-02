"use client";

import { useMemo, useState } from "react";
import { ProjectGrid } from "./project-grid";
import { cn } from "@/lib/utils";
import { categoryLabels } from "@/lib/labels";
import type { Project, ProjectCategory } from "@/types/content";

type Filter = "ALL" | ProjectCategory;

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("ALL");

  // Only show category chips that actually have projects.
  const available = useMemo(() => {
    const set = new Set<ProjectCategory>();
    projects.forEach((p) => set.add(p.category));
    return Array.from(set);
  }, [projects]);

  const filtered = useMemo(
    () =>
      filter === "ALL"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter, projects],
  );

  const chips: Filter[] = ["ALL", ...available];

  return (
    <div className="flex flex-col gap-8">
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {chips.map((c) => {
          const active = filter === c;
          const count =
            c === "ALL"
              ? projects.length
              : projects.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c)}
              className={cn(
                "border-brutal shadow-brutal-sm hover-brutal px-4 py-2 font-display text-sm font-bold",
                active
                  ? "bg-accent text-accent-foreground"
                  : "bg-surface text-foreground",
              )}
            >
              {c === "ALL" ? "All" : categoryLabels[c]}
              <span className="ml-2 font-mono text-xs opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      <ProjectGrid projects={filtered} />
    </div>
  );
}
