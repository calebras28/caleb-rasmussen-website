import type { Metadata } from "next";
import { Clock } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { StatusBadge } from "@/components/portfolio/status-badge";
import { TechnologyList } from "@/components/portfolio/technology-badge";
import { getNowItems } from "@/lib/content";
import { timeAgo } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What I'm currently building, learning, and exploring — updated regularly.",
};

export default async function NowPage() {
  const items = await getNowItems();

  return (
    <>
      <PageHeader
        eyebrow="Currently"
        title="What I'm working on now."
        description="Inspired by the /now movement. A living snapshot of my current focus — projects in flight, things I'm learning, and ideas I'm chasing."
      />

      <Container className="py-16 md:py-20">
        {items.length === 0 ? (
          <Card className="grid place-items-center p-12 text-center">
            <p className="font-display text-lg font-bold">Nothing here yet</p>
            <p className="mt-1 text-sm text-muted">
              Add your current focus from the admin dashboard.
            </p>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <Card className="flex h-full flex-col gap-4 p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-xl font-bold">
                      {item.title}
                    </h2>
                    <StatusBadge status={item.status} />
                  </div>

                  <p className="text-sm text-muted">{item.description}</p>

                  {item.goals ? (
                    <div className="border-brutal bg-surface-alt p-3">
                      <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted">
                        Current goal
                      </p>
                      <p className="mt-1 text-sm">{item.goals}</p>
                    </div>
                  ) : null}

                  <TechnologyList items={item.technologies} max={6} className="mt-auto" />

                  <p className="flex items-center gap-1.5 border-t-[3px] border-border pt-3 font-mono text-xs text-muted">
                    <Clock className="h-3.5 w-3.5" /> Updated{" "}
                    {timeAgo(item.updatedAt)}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
