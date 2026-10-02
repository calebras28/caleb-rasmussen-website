import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/portfolio/status-badge";
import { ProgressBar } from "@/components/portfolio/progress-bar";
import { TechnologyList } from "@/components/portfolio/technology-badge";

describe("Button", () => {
  it("renders a native button by default", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn.tagName).toBe("BUTTON");
  });

  it("renders an internal link when href is provided", () => {
    render(<Button href="/projects">Projects</Button>);
    const link = screen.getByRole("link", { name: "Projects" });
    expect(link).toHaveAttribute("href", "/projects");
  });

  it("renders an external link with security attributes", () => {
    render(<Button href="https://example.com">External</Button>);
    const link = screen.getByRole("link", { name: "External" });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });
});

describe("StatusBadge", () => {
  it("renders a human-readable status label", () => {
    render(<StatusBadge status="IN_DEVELOPMENT" />);
    expect(screen.getByText("In Development")).toBeInTheDocument();
  });
});

describe("ProgressBar", () => {
  it("exposes accessible progress values", () => {
    render(<ProgressBar value={42} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "42");
  });

  it("clamps out-of-range values", () => {
    render(<ProgressBar value={150} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "100",
    );
  });
});

describe("TechnologyList", () => {
  it("truncates with a +more badge when max is exceeded", () => {
    render(
      <TechnologyList items={["A", "B", "C", "D", "E"]} max={3} />,
    );
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("+2 more")).toBeInTheDocument();
  });
});
