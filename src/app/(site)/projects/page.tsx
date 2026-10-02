import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectsExplorer } from "@/components/portfolio/projects-explorer";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of software I've designed and built — full-stack apps, backend services, AI tools, and more.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Things I've built."
        description="From full-stack applications to backend services and experiments. Each one taught me something new."
      />
      <Container className="py-16 md:py-20">
        <ProjectsExplorer projects={projects} />
      </Container>
    </>
  );
}
