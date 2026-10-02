import { z } from "zod";

const PROJECT_CATEGORIES = [
  "FULLSTACK",
  "FRONTEND",
  "BACKEND",
  "MOBILE",
  "AI",
  "PERSONAL",
  "SCHOOL",
] as const;

const PROJECT_STATUSES = [
  "IDEA",
  "PLANNING",
  "IN_DEVELOPMENT",
  "TESTING",
  "DEPLOYED",
  "COMPLETED",
] as const;

/** Public contact form. */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Please enter a valid email address."),
  subject: z
    .string()
    .trim()
    .max(150, "Subject is too long.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message is too long."),
  // Honeypot field — must be empty. Bots tend to fill every field.
  company: z.string().max(0, "Bot detected.").optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Admin login. */
export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email."),
  password: z.string().min(1, "Password is required."),
});

export type LoginInput = z.infer<typeof loginSchema>;

/** Admin: create/update project. */
export const projectSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required.")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only."),
  title: z.string().trim().min(1, "Title is required.").max(120),
  summary: z.string().trim().min(1, "Summary is required.").max(280),
  description: z.string().trim().min(1, "Description is required."),
  problem: z.string().optional().or(z.literal("")),
  solution: z.string().optional().or(z.literal("")),
  features: z.array(z.string().trim().min(1)).default([]),
  architecture: z.string().optional().or(z.literal("")),
  whatILearned: z.string().optional().or(z.literal("")),
  challenges: z.string().optional().or(z.literal("")),
  futureImprovements: z.string().optional().or(z.literal("")),
  category: z.enum(PROJECT_CATEGORIES),
  status: z.enum(PROJECT_STATUSES),
  githubUrl: z.string().url("Enter a valid URL.").optional().or(z.literal("")),
  liveUrl: z.string().url("Enter a valid URL.").optional().or(z.literal("")),
  coverImage: z.string().url("Enter a valid URL.").optional().or(z.literal("")),
  featured: z.boolean().default(false),
  order: z.coerce.number().int().min(0).default(0),
  date: z.string().min(1, "Date is required."),
  technologies: z.array(z.string().trim().min(1)).default([]),
});

export type ProjectInput = z.infer<typeof projectSchema>;

/** Admin: create/update "now" item. */
export const nowItemSchema = z.object({
  title: z.string().trim().min(1, "Title is required.").max(120),
  description: z.string().trim().min(1, "Description is required."),
  status: z.enum(PROJECT_STATUSES),
  progress: z.coerce.number().int().min(0).max(100).default(0),
  technologies: z.array(z.string().trim().min(1)).default([]),
  goals: z.string().optional().or(z.literal("")),
  order: z.coerce.number().int().min(0).default(0),
});

export type NowItemInput = z.infer<typeof nowItemSchema>;

/** Admin: site settings. */
export const siteSettingsSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required."),
  tagline: z.string().trim().min(1, "Tagline is required."),
  bio: z.string().trim().min(1, "Bio is required."),
  email: z.string().trim().email("Enter a valid email."),
  location: z.string().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  twitterUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  resumeUrl: z.string().optional().or(z.literal("")),
  avatarUrl: z.string().url().optional().or(z.literal("")),
});

export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>;

export { PROJECT_CATEGORIES, PROJECT_STATUSES };
