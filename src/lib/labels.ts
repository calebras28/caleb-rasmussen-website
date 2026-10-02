import type { ProjectCategory, ProjectStatus } from "@/types/content";

type BadgeColor = "default" | "blue" | "yellow" | "red" | "lime" | "purple" | "pink";

export const categoryLabels: Record<ProjectCategory, string> = {
  FULLSTACK: "Full Stack",
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  MOBILE: "Mobile",
  AI: "AI",
  PERSONAL: "Personal",
  SCHOOL: "School",
};

export const categoryColors: Record<ProjectCategory, BadgeColor> = {
  FULLSTACK: "blue",
  FRONTEND: "pink",
  BACKEND: "purple",
  MOBILE: "lime",
  AI: "yellow",
  PERSONAL: "default",
  SCHOOL: "default",
};

export const statusLabels: Record<ProjectStatus, string> = {
  IDEA: "Idea",
  PLANNING: "Planning",
  IN_DEVELOPMENT: "In Development",
  TESTING: "Testing",
  DEPLOYED: "Deployed",
  COMPLETED: "Completed",
};

export const statusColors: Record<ProjectStatus, BadgeColor> = {
  IDEA: "default",
  PLANNING: "purple",
  IN_DEVELOPMENT: "yellow",
  TESTING: "pink",
  DEPLOYED: "lime",
  COMPLETED: "blue",
};

export const allCategories = Object.keys(categoryLabels) as ProjectCategory[];
export const allStatuses = Object.keys(statusLabels) as ProjectStatus[];
