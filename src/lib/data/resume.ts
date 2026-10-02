import type { Education, Experience } from "@/types/content";

/** Work experience, newest first. */
export const experiences: Experience[] = [
  {
    role: "Data Engineer",
    company: "BYU OIT",
    location: "Provo, UT",
    startDate: "2026-04-01",
    endDate: null,
    current: true,
    description:
      "Build and maintain ETL data pipelines across the university's core systems.",
    highlights: [
      "Developed and maintained 100+ ETL data pipelines across 10+ university systems (Finance, Admissions, Canvas, etc.), extracting, transforming, and loading data to ensure accurate, reliable delivery.",
      "Optimized SQL queries and transformation logic within ETL flows to improve processing efficiency and reduce runtime, streamlining integration across source and target systems.",
      "Diagnosed and resolved data quality issues (nulls, duplicates, mismatched keys) across incoming feeds, building validation checks that eliminated downstream errors.",
    ],
  },
  {
    role: "Data Science Intern",
    company: "Shownspace",
    location: "Provo, UT",
    startDate: "2026-01-01",
    endDate: "2026-04-30",
    current: false,
    description:
      "Built real-time sports analytics infrastructure for Ultimate Frisbee data.",
    highlights: [
      "Collaborated with a team to develop infrastructure supporting real-time sports analytics.",
      "Built a real-time pipeline ingesting 120,000+ plays per hour using Python, Supabase, and Render.",
      "Integrated sports data APIs to automate collection, processing, and storage of game data for analytics and modeling.",
      "Integrated machine learning models to estimate completion probability, field value, and win probability for every throw.",
      "Automated computation of 10+ advanced metrics per play via a deployed polling worker updating data every 3 seconds.",
      "Structured a PostgreSQL database with multiple relational tables to support large-scale analytics queries.",
    ],
  },
  {
    role: "Youth Camp Director",
    company: "Self Run",
    location: "Moorpark, CA",
    startDate: "2019-09-01",
    endDate: "2023-08-31",
    current: false,
    description:
      "Ran a youth camp, managing operations, finances, and diverse groups of children.",
    highlights: [
      "Navigated high-pressure situations and resolved conflicts while balancing the needs and interests of diverse groups of children.",
      "Handled budgeting, payment collection, expense tracking, and overall financial organization.",
    ],
  },
];

/** Education history, newest first. */
export const education: Education[] = [
  {
    school: "Brigham Young University",
    degree: "B.S. Applied Computational Mathematics",
    field: "AI and Machine Learning",
    location: "Provo, UT",
    startDate: "2025-09-01",
    endDate: "2028-04-30",
    current: true,
    description:
      "Emphasis in AI and machine learning. Expected graduation April 2028.",
    highlights: [
      "GPA: 4.00",
      "Academic Scholarship: half-tuition four-year scholarship",
      "Organizations: AI in Business Club, AI Association",
      "Relevant coursework: Linear Algebra, Multivariable Calculus, Differential Equations, Statistics, Mathematical Programming (Python), Computational Linear Algebra",
    ],
  },
];

/** Leadership, volunteering, and activities for the resume page. */
export const activities = [
  {
    title: "Full-Time Church Representative",
    organization: "The Church of Jesus Christ of Latter-day Saints",
    period: "2023 — 2025",
    description:
      "Served in Iquitos, Peru. Achieved fluency in Spanish, led and trained groups of 30+ volunteers, and served the community through service projects and free English classes.",
  },
  {
    title: "Academic Scholarship",
    organization: "Brigham Young University",
    period: "2025 — 2028",
    description:
      "Awarded a half-tuition, four-year academic scholarship while maintaining a 4.00 GPA.",
  },
  {
    title: "AI in Business Club & AI Association",
    organization: "Brigham Young University",
    period: "2025 — Present",
    description:
      "Active member of BYU's AI in Business Club and AI Association.",
  },
];
