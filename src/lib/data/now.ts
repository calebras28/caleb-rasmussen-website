import type { NowItem } from "@/types/content";

/** "Currently working on" items. Keep these fresh to make the site feel alive. */
export const nowItems: NowItem[] = [
  {
    title: "Ma and Pa App",
    description:
      "Building a full-stack iOS app that helps local businesses stand out against large corporations, with React Native, Expo, and Supabase.",
    status: "IN_DEVELOPMENT",
    progress: 60,
    technologies: ["TypeScript", "React Native", "Expo", "Supabase"],
    goals: "Ship a polished MVP and get it into the hands of local businesses.",
    updatedAt: "2026-08-01",
  },
  {
    title: "AI Internship Tracker",
    description:
      "Improving my internship tracker with AI-powered resume optimization tailored to specific internship postings.",
    status: "IN_DEVELOPMENT",
    progress: 70,
    technologies: ["TypeScript", "React", "Supabase", "OpenAI API"],
    goals: "Refine the AI resume optimization and polish the tracking workflow.",
    updatedAt: "2026-07-20",
  },
  {
    title: "Data Engineering @ BYU OIT",
    description:
      "Developing and optimizing ETL pipelines across the university's core systems to deliver accurate, reliable data.",
    status: "IN_DEVELOPMENT",
    progress: 50,
    technologies: ["Python", "SQL", "ETL"],
    goals: "Keep improving pipeline reliability and query performance.",
    updatedAt: "2026-08-10",
  },
  {
    title: "Applied Computational Mathematics @ BYU",
    description:
      "Studying applied math with an emphasis in AI and machine learning — deepening my foundations in linear algebra, statistics, and ML.",
    status: "IN_DEVELOPMENT",
    progress: 30,
    technologies: ["Python", "Machine Learning", "Statistics"],
    goals: "Apply coursework to real data and AI projects.",
    updatedAt: "2026-08-10",
  },
];
