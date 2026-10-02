"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, MapPin, X } from "lucide-react";
import type { MissionPhoto } from "@/types/content";
import { formatDate } from "@/lib/utils";

export function MissionGallery({ photos }: { photos: MissionPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)),
    [photos.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  const active = index === null ? null : photos[index];

  return (
    <>
      {/* Masonry via CSS columns */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {photos.map((photo, i) => (
          <button
            key={`${photo.url}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden border-brutal shadow-brutal hover-brutal"
            aria-label={photo.caption ?? `Open photo ${i + 1}`}
          >
            <Image
              src={photo.url}
              alt={photo.caption ?? "Mission photo"}
              width={photo.width ?? 1200}
              height={photo.height ?? 800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
            {photo.caption ? (
              <span className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/80 p-3 text-left text-sm font-medium text-paper transition-transform duration-200 group-hover:translate-y-0">
                {photo.caption}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      {active !== null && typeof document !== "undefined"
        ? createPortal(
            <div
              className="fixed inset-0 z-[100] flex flex-col bg-ink/90 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-label="Photo viewer"
            >
              <div className="flex items-center justify-between p-4 text-paper">
                <span className="font-mono text-sm">
                  {(index ?? 0) + 1} / {photos.length}
                </span>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close viewer"
                  className="border-brutal grid h-10 w-10 place-items-center bg-paper text-ink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative flex flex-1 items-center justify-center px-2 pb-4 sm:px-14">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous photo"
                  className="border-brutal absolute left-2 z-10 grid h-11 w-11 place-items-center bg-paper text-ink sm:left-4"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>

                <figure className="flex max-h-full max-w-4xl flex-col items-center">
                  <div className="relative max-h-[70vh] w-full">
                    <Image
                      src={active.url}
                      alt={active.caption ?? "Mission photo"}
                      width={active.width ?? 1200}
                      height={active.height ?? 800}
                      className="border-brutal mx-auto h-auto max-h-[70vh] w-auto object-contain"
                    />
                  </div>
                  <figcaption className="mt-4 max-w-2xl text-center text-paper">
                    {active.caption ? (
                      <p className="font-medium">{active.caption}</p>
                    ) : null}
                    <p className="mt-1 flex items-center justify-center gap-3 font-mono text-xs text-paper/70">
                      {active.location ? (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {active.location}
                        </span>
                      ) : null}
                      {active.date ? <span>{formatDate(active.date)}</span> : null}
                    </p>
                  </figcaption>
                </figure>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next photo"
                  className="border-brutal absolute right-2 z-10 grid h-11 w-11 place-items-center bg-paper text-ink sm:right-4"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
