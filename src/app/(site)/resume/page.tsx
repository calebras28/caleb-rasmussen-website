import type { Metadata } from "next";
import { Download, Briefcase, GraduationCap, Award, Wrench } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { Timeline, TimelineItem } from "@/components/portfolio/timeline";
import { PrintButton } from "@/components/portfolio/print-button";
import {
  getSiteSettings,
  getExperiences,
  getEducation,
  getSkills,
} from "@/lib/content";
import { activities } from "@/lib/data/resume";
import { formatDateRange } from "@/lib/utils";
import type { ResumeSkill } from "@/types/content";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "My experience, education, skills, and accomplishments — available to view online or download as a PDF.",
};

function groupSkills(skills: ResumeSkill[]) {
  const groups = new Map<string, ResumeSkill[]>();
  for (const s of skills) {
    const list = groups.get(s.category) ?? [];
    list.push(s);
    groups.set(s.category, list);
  }
  return Array.from(groups.entries());
}

function SkillLevel({ level }: { level: number }) {
  return (
    <span className="flex gap-1" aria-label={`Proficiency ${level} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 border-2 border-border ${
            i < level ? "bg-accent" : "bg-transparent"
          }`}
          aria-hidden
        />
      ))}
    </span>
  );
}

export default async function ResumePage() {
  const [site, experiences, education, skills] = await Promise.all([
    getSiteSettings(),
    getExperiences(),
    getEducation(),
    getSkills(),
  ]);

  const skillGroups = groupSkills(skills);

  return (
    <>
      <PageHeader
        eyebrow="Resume"
        title="Experience & credentials."
        description="A snapshot of where I've worked, what I've studied, and the tools I use to build."
      >
        <div className="flex flex-wrap gap-3">
          {site.resumeUrl ? (
            <Button href={site.resumeUrl} variant="accent" download>
              <Download className="h-5 w-5" /> Download PDF
            </Button>
          ) : null}
          <PrintButton />
        </div>
      </PageHeader>

      <Container className="py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div className="flex flex-col gap-14">
            {/* Experience */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center border-brutal bg-accent text-accent-foreground shadow-brutal-sm">
                  <Briefcase className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-black">Experience</h2>
              </div>
              <Timeline>
                {experiences.map((exp) => (
                  <TimelineItem
                    key={`${exp.company}-${exp.role}`}
                    meta={formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    title={exp.role}
                    subtitle={exp.company}
                    location={exp.location}
                    description={exp.description}
                    highlights={exp.highlights}
                  />
                ))}
              </Timeline>
            </section>

            {/* Education */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center border-brutal bg-accent text-accent-foreground shadow-brutal-sm">
                  <GraduationCap className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-black">Education</h2>
              </div>
              <Timeline>
                {education.map((edu) => (
                  <TimelineItem
                    key={`${edu.school}-${edu.degree}`}
                    meta={formatDateRange(edu.startDate, edu.endDate, edu.current)}
                    title={edu.degree}
                    subtitle={edu.school}
                    location={edu.location}
                    description={edu.description}
                    highlights={edu.highlights}
                  />
                ))}
              </Timeline>
            </section>

            {/* Activities */}
            <section>
              <div className="mb-6 flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center border-brutal bg-accent text-accent-foreground shadow-brutal-sm">
                  <Award className="h-5 w-5" />
                </span>
                <h2 className="font-display text-2xl font-black">
                  Leadership & activities
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {activities.map((a) => (
                  <Card key={a.title} className="p-5">
                    <h3 className="font-display font-bold">{a.title}</h3>
                    <p className="text-sm font-semibold text-muted">
                      {a.organization} · {a.period}
                    </p>
                    <p className="mt-2 text-sm text-muted">{a.description}</p>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Skills sidebar */}
          <aside className="flex flex-col gap-6">
            <div className="mb-0 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center border-brutal bg-accent text-accent-foreground shadow-brutal-sm">
                <Wrench className="h-5 w-5" />
              </span>
              <h2 className="font-display text-2xl font-black">Skills</h2>
            </div>
            {skillGroups.map(([category, items]) => (
              <Card key={category} className="p-5">
                <h3 className="mb-3 font-mono text-xs font-bold uppercase tracking-widest text-muted">
                  {category}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {items.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span className="font-medium">{s.name}</span>
                      <SkillLevel level={s.level} />
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </aside>
        </div>

        {site.resumeUrl ? (
          <section className="mt-16">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-black">Resume (PDF)</h2>
              <Button href={site.resumeUrl} variant="secondary" download>
                <Download className="h-5 w-5" /> Download PDF
              </Button>
            </div>
            <div className="border-brutal shadow-brutal overflow-hidden bg-surface">
              <object
                data={site.resumeUrl}
                type="application/pdf"
                className="hidden h-[80vh] w-full sm:block"
                aria-label="Resume PDF preview"
              >
                <div className="p-6 text-center text-sm text-muted">
                  Your browser can&apos;t display the embedded PDF.{" "}
                  <a href={site.resumeUrl} className="font-semibold underline">
                    Download it here
                  </a>
                  .
                </div>
              </object>
              <div className="p-6 text-center text-sm text-muted sm:hidden">
                <a href={site.resumeUrl} className="font-semibold underline">
                  Open the PDF resume
                </a>
              </div>
            </div>
          </section>
        ) : null}
      </Container>
    </>
  );
}
