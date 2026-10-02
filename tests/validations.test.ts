import { describe, it, expect } from "vitest";
import {
  contactSchema,
  loginSchema,
  projectSchema,
  nowItemSchema,
} from "@/lib/validations";

describe("contactSchema", () => {
  it("accepts a valid message", () => {
    const result = contactSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Hello",
      message: "This is a valid message with enough length.",
      company: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a short name", () => {
    const result = contactSchema.safeParse({
      name: "J",
      email: "jane@example.com",
      message: "This is a valid message with enough length.",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({
      name: "Jane Doe",
      email: "not-an-email",
      message: "This is a valid message with enough length.",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeTruthy();
    }
  });

  it("rejects a too-short message", () => {
    const result = contactSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "short",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    const result = contactSchema.safeParse({
      name: "Jane Doe",
      email: "jane@example.com",
      message: "This is a valid message with enough length.",
      company: "spam corp",
    });
    expect(result.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("requires a valid email and password", () => {
    expect(
      loginSchema.safeParse({ email: "a@b.com", password: "x" }).success,
    ).toBe(true);
    expect(
      loginSchema.safeParse({ email: "bad", password: "x" }).success,
    ).toBe(false);
    expect(
      loginSchema.safeParse({ email: "a@b.com", password: "" }).success,
    ).toBe(false);
  });
});

describe("projectSchema", () => {
  const base = {
    slug: "my-project",
    title: "My Project",
    summary: "A summary",
    description: "A description",
    category: "FULLSTACK",
    status: "COMPLETED",
    date: "2025-01-01",
  };

  it("accepts a minimal valid project", () => {
    const result = projectSchema.safeParse(base);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid slug", () => {
    const result = projectSchema.safeParse({ ...base, slug: "Invalid Slug!" });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid category", () => {
    const result = projectSchema.safeParse({ ...base, category: "NOPE" });
    expect(result.success).toBe(false);
  });

  it("coerces order to a number and defaults arrays", () => {
    const result = projectSchema.safeParse({ ...base, order: "5" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.order).toBe(5);
      expect(result.data.features).toEqual([]);
      expect(result.data.technologies).toEqual([]);
    }
  });
});

describe("nowItemSchema", () => {
  it("clamps progress within 0-100", () => {
    expect(
      nowItemSchema.safeParse({
        title: "T",
        description: "D",
        status: "IN_DEVELOPMENT",
        progress: "150",
      }).success,
    ).toBe(false);

    const ok = nowItemSchema.safeParse({
      title: "T",
      description: "D",
      status: "IN_DEVELOPMENT",
      progress: "50",
    });
    expect(ok.success).toBe(true);
    if (ok.success) expect(ok.data.progress).toBe(50);
  });
});
