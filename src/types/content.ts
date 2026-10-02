export type ProjectCategory =
  | "FULLSTACK"
  | "FRONTEND"
  | "BACKEND"
  | "MOBILE"
  | "AI"
  | "PERSONAL"
  | "SCHOOL";

export type ProjectStatus =
  | "IDEA"
  | "PLANNING"
  | "IN_DEVELOPMENT"
  | "TESTING"
  | "DEPLOYED"
  | "COMPLETED";

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  problem?: string | null;
  solution?: string | null;
  features: string[];
  architecture?: string | null;
  whatILearned?: string | null;
  challenges?: string | null;
  futureImprovements?: string | null;
  category: ProjectCategory;
  status: ProjectStatus;
  githubUrl?: string | null;
  liveUrl?: string | null;
  coverImage?: string | null;
  featured: boolean;
  order: number;
  date: string;
  technologies: string[];
  images: ProjectImage[];
}

export interface NowItem {
  title: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  technologies: string[];
  goals?: string | null;
  updatedAt: string;
}

export interface MissionPhoto {
  url: string;
  caption?: string | null;
  location?: string | null;
  date?: string | null;
  width?: number;
  height?: number;
}

export interface MissionStory {
  title: string;
  location: string;
  date: string;
  body: string;
  photos: MissionPhoto[];
}

export interface Experience {
  role: string;
  company: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface Education {
  school: string;
  degree: string;
  field?: string | null;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description?: string | null;
  highlights: string[];
}

export interface ResumeSkill {
  category: string;
  name: string;
  level: number;
}

export interface SiteSettings {
  fullName: string;
  tagline: string;
  bio: string;
  email: string;
  location?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  websiteUrl?: string | null;
  resumeUrl?: string | null;
  avatarUrl?: string | null;
}
