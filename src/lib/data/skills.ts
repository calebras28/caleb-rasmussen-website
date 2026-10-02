import type { ResumeSkill } from "@/types/content";

/**
 * Technical skills grouped by category. `level` is 1-5 and drives the small
 * proficiency indicator on the resume page.
 */
export const skills: ResumeSkill[] = [
  { category: "Programming", name: "Python", level: 5 },
  { category: "Programming", name: "SQL", level: 5 },
  { category: "Programming", name: "TypeScript", level: 4 },
  { category: "Programming", name: "R", level: 3 },

  { category: "Data & ML", name: "Pandas", level: 5 },
  { category: "Data & ML", name: "NumPy", level: 4 },
  { category: "Data & ML", name: "XGBoost", level: 4 },
  { category: "Data & ML", name: "Machine Learning", level: 4 },

  { category: "Frontend", name: "React", level: 4 },
  { category: "Frontend", name: "React Native", level: 3 },
  { category: "Frontend", name: "Expo", level: 3 },

  { category: "Tools & Cloud", name: "Supabase", level: 4 },
  { category: "Tools & Cloud", name: "PostgreSQL", level: 4 },
  { category: "Tools & Cloud", name: "REST APIs", level: 4 },
  { category: "Tools & Cloud", name: "Render", level: 3 },
  { category: "Tools & Cloud", name: "LaTeX", level: 3 },

  { category: "AI Tools", name: "OpenAI API", level: 4 },
  { category: "AI Tools", name: "Claude", level: 4 },
  { category: "AI Tools", name: "Cursor", level: 4 },
  { category: "AI Tools", name: "Codex", level: 3 },

  { category: "Languages", name: "Spanish (Fluent)", level: 5 },
];

/** The condensed skill set surfaced on the home page marquee. */
export const featuredSkills = [
  "Python",
  "SQL",
  "TypeScript",
  "React",
  "Supabase",
  "PostgreSQL",
  "Pandas",
  "Machine Learning",
  "APIs",
  "R",
];
