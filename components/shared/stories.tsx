"use client";
import {cn} from "@/lib/utils";
import {Api} from "@/services/api-clien";
import {IStory} from "@/services/stories";
import React, {useEffect, useState} from "react";
import {Container} from "./container";
import {X} from "lucide-react";
import ReactInstaStories from "react-insta-stories";

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({className}) => {
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

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <Container
      className={cn("flex items-center jusify-between gap-2 my-10", className)}
    >
      {stories.length === 0 &&
        [...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
          ></div>
        ))}

      {stories.map((story) => (
          <div
            key={story.id}
            className="group relative
            w-[200px] h-[250px]
            rounded-xl overflow-hidden
            cursor-pointer
            transition-transform duration-300
            hover:scale-[1.03]"
            onClick={() => onClickStory(story)}
          >
            <img

              className="
              w-full h-full
              object-cover
              transition-transform duration-300
              group-hover:scale-110"
              height={250}
              width={200}
              src={story.previewImageUrl}
            />
          </div>

        )
      )}

      {open && (
        <div
          className="
          fixed inset-0 z-50
          bg-black/80
          flex items-center justify-center
          px-4"
        >
          <div
            className="
            relative
            w-[360px]
            max-h-[90vh]
            aspect-[9/16]
            bg-black
            rounded-xl
            overflow-hidden"
          >
            <button
              className="
              absolute top-3 right-3 z-50
              text-white/70 hover:text-white
              transition cursor-pointer"
              type="button"
              onClick={() => setOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <ReactInstaStories
              onAllStoriesEnd={() => setOpen(false)}
              stories={
                selectedStory?.items.map((item) => ({
                  content: () => (
                    <img
                      src={item.sourceUrl}
                      className="w-full h-full object-cover"
                    />
                  ),
                })) || []
              }
              defaultInterval={3000}
              width={360}
              height={640}
            />
          </div>
        </div>
      )}


    </Container>
  )
    ;
};
