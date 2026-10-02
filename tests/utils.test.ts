import { describe, it, expect } from "vitest";
import { slugify, formatDateRange, timeAgo, cn } from "@/lib/utils";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });
  it("strips special characters", () => {
    expect(slugify("My Project! (v2)")).toBe("my-project-v2");
  });
  it("collapses repeated separators", () => {
    expect(slugify("a   b---c")).toBe("a-b-c");
  });
});

describe("formatDateRange", () => {
  it("renders a range", () => {
    expect(formatDateRange("2020-01-01", "2021-06-01")).toBe(
      "Jan 2020 — Jun 2021",
    );
  });
  it("renders present when current", () => {
    expect(formatDateRange("2020-01-01", null, true)).toBe("Jan 2020 — Present");
  });
  it("renders a single date when no end", () => {
    expect(formatDateRange("2020-01-01")).toBe("Jan 2020");
  });
});

describe("timeAgo", () => {
  it("returns 'just now' for recent times", () => {
    expect(timeAgo(new Date())).toBe("just now");
  });
  it("returns days for older times", () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 86400 * 1000);
    expect(timeAgo(threeDaysAgo)).toBe("3 days ago");
  });
});

describe("cn", () => {
  it("merges and dedupes tailwind classes", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
    expect(cn("text-sm", false && "hidden", "font-bold")).toBe(
      "text-sm font-bold",
    );
  });
});
