import type { Project } from "@/types/content";

/**
 * Personal projects. Add screenshots, GitHub, and live-demo links as they
 * become available — the shape maps 1:1 to the Prisma `Project` model.
 */
export const projects: Project[] = [
  {
    slug: "ma-and-pa-app",
    title: "Ma and Pa App",
    summary:
      "A full-stack iOS app that helps local businesses stand out in a market dominated by large corporations.",
    description:
      "Ma and Pa is a full-stack iOS application built to give small, local (\"mom and pop\") businesses a place to be discovered in a market crowded by huge corporations. It focuses on a clean mobile experience backed by a real database and authentication.",
    problem:
      "Local businesses struggle to get visibility next to big-budget national brands, and existing platforms aren't built to highlight what makes them special.",
    solution:
      "A mobile-first app that surfaces local businesses to nearby users, giving small shops a simple way to build a presence and reach customers.",
    features: [
      "Native iOS experience built with React Native and Expo",
      "Business profiles for local shops",
      "Supabase-backed data and authentication",
      "Mobile-first, responsive UI",
    ],
    architecture:
      "React Native (Expo) client with a Supabase backend (PostgreSQL, auth, and storage), written end-to-end in TypeScript.",
    whatILearned:
      "Building for mobile end-to-end — from data modeling in Supabase to native UI patterns and app distribution with Expo.",
    challenges: null,
    futureImprovements: null,
    category: "MOBILE",
    status: "IN_DEVELOPMENT",
    githubUrl: null,
    liveUrl: null,
    coverImage: null,
    featured: true,
    order: 1,
    date: "2026-05-01",
    technologies: ["TypeScript", "React Native", "Expo", "Supabase"],
    images: [],
  },
  {
    slug: "ai-internship-tracker",
    title: "AI Internship Tracker",
    summary:
      "An internship tracker with a to-do list and AI-powered resume optimization tailored to specific internships.",
    description:
      "The AI Internship Tracker makes the internship hunt organized and less stressful. It lets you track every internship you've applied to, manage a to-do list, and use AI to optimize your resume for a specific internship posting.",
    problem:
      "Applying to internships means juggling many applications, deadlines, and resume tweaks — it's easy to lose track and hard to tailor a resume to each role.",
    solution:
      "A single app to track applications and to-dos, plus an AI feature that optimizes your resume for a given internship so each application is more targeted.",
    features: [
      "Track internships you've applied to in one place",
      "Built-in to-do list to manage next steps",
      "AI resume optimization for specific internships (OpenAI API)",
      "Supabase-backed data and authentication",
    ],
    architecture:
      "React front end in TypeScript, Supabase (PostgreSQL + auth) for data, and the OpenAI API for resume optimization.",
    whatILearned:
      "Integrating an LLM into a product workflow and designing prompts that produce useful, structured resume suggestions.",
    challenges: null,
    futureImprovements: null,
    category: "AI",
    status: "IN_DEVELOPMENT",
    githubUrl: null,
    liveUrl: null,
    coverImage: null,
    featured: true,
    order: 2,
    date: "2026-03-01",
    technologies: ["TypeScript", "React", "Supabase", "OpenAI API"],
    images: [],
  },
];
