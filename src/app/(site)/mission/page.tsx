import type { Metadata } from "next";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { MissionGallery } from "@/components/portfolio/mission-gallery";
import { getMissionStories } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mission",
  description:
    "Stories, photos, and reflections from my full-time volunteer mission — a formative chapter that shaped who I am.",
};

export default async function MissionPage() {
  const stories = await getMissionStories();
  const allPhotos = stories.flatMap((s) => s.photos);

  return (
    <>
      <PageHeader
        eyebrow="My mission"
        title="Two years in the amazon rainforest of Peru"
        description="Before BYU, I served a full-time volunteer mission. These are the places, people, and moments that shaped me."
      />

      {stories.length === 0 ? (
        <Container className="py-20">
          <Card className="grid place-items-center p-12 text-center">
            <p className="font-display text-lg font-bold">
              No mission stories yet
            </p>
            <p className="mt-1 text-sm text-muted">
              Add your first story and photos from the admin dashboard.
            </p>
          </Card>
        </Container>
      ) : (
        <>
          {/* Story timeline */}
          <Container className="py-16 md:py-20">
            <SectionHeading
              eyebrow="Timeline"
              title="Each stage of my mission"
              className="mb-12"
            />
            <div className="flex flex-col gap-16">
              {stories.map((story, i) => (
                <Reveal key={story.title}>
                  <article className="grid gap-8 md:grid-cols-2 md:items-center">
                    <div
                      className={
                        i % 2 === 1 ? "md:order-2" : undefined
                      }
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge color="blue">
                          <MapPin className="h-3 w-3" /> {story.location}
                        </Badge>
                        <Badge color="yellow">
                          <Calendar className="h-3 w-3" /> {formatDate(story.date)}
                        </Badge>
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-black sm:text-3xl">
                        {story.title}
                      </h3>
                      <p className="mt-3 leading-relaxed text-muted">
                        {story.body}
                      </p>
                    </div>

                    <div
                      className={`gap-3 ${
                        story.photos.length === 1 ? "" : "columns-2"
                      } ${i % 2 === 1 ? "md:order-1" : ""}`}
                    >
                      {story.photos.slice(0, 4).map((photo, j) => (
                        <div
                          key={`${photo.url}-${j}`}
                          className="mb-3 overflow-hidden border-brutal shadow-brutal-sm break-inside-avoid"
                        >
                          <Image
                            src={photo.url}
                            alt={photo.caption ?? story.title}
                            width={photo.width}
                            height={photo.height}
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="h-auto w-full"
                          />
                        </div>
                      ))}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>

          {/* Full gallery */}
          <section className="border-t-[3px] border-border bg-surface-alt py-16 md:py-20">
            <Container>
              <SectionHeading
                eyebrow="Gallery"
                description="Click any photo to view it larger. Use arrow keys to navigate."
                className="mb-10"
              />
              <MissionGallery photos={allPhotos} />
            </Container>
          </section>
        </>
      )}
    </>
  );
}
