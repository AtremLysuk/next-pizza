"use client";

import { cn } from "@/lib/utils";
import { Api } from "@/services/api-clien";
import { IStory } from "@/services/stories";
import React, { useEffect, useState } from "react";
import { Container } from "./container";
import { X } from "lucide-react";
import ReactInstaStories from "react-insta-stories";

interface Props {
  className?: string;
}

const CARD_SIZE = "w-[140px] h-[175px] md:w-[200px] md:h-[250px]";

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  // Пока история открыта: блокируем прокрутку страницы и закрываем по Esc
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <Container className={cn("my-6 md:my-10", className)}>
      <div className="flex gap-2 overflow-x-auto scrollbar-none md:scrollbar-thin p-1 md:pb-3">
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className={cn(
                CARD_SIZE,
                "shrink-0 rounded-xl bg-gray-200 animate-pulse",
              )}
            />
          ))}

        {stories.map((story, index) => (
          <button
            key={story.id}
            type="button"
            aria-label={`Открыть историю ${index + 1}`}
            className={cn(
              CARD_SIZE,
              "group relative shrink-0 overflow-hidden rounded-xl transition-transform duration-300 md:hover:scale-[1.03]",
            )}
            onClick={() => onClickStory(story)}
          >
            <img
              src={story.previewImageUrl}
              alt=""
              width={200}
              height={250}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </button>
        ))}
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="История"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative aspect-[9/16] h-[min(640px,90vh)] max-w-full overflow-hidden rounded-xl bg-black"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Закрыть"
              className="absolute right-3 top-3 z-50 text-white/70 transition hover:text-white"
              onClick={() => setOpen(false)}
            >
              <X className="h-6 w-6" />
            </button>

            <ReactInstaStories
              onAllStoriesEnd={() => setOpen(false)}
              stories={
                selectedStory?.items.map((item) => ({
                  content: () => (
                    <img
                      src={item.sourceUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ),
                })) ?? []
              }
              defaultInterval={3000}
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
    </Container>
  );
};
