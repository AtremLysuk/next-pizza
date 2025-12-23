import {prisma} from "@/prisma/prisma-client";
import {NextResponse} from "next/server";


export async function POST() {
  const stories = await prisma.story.createMany({
    data: [
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-1.webp",
      },
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-2.webp",
      },
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-3.jpg",
      },
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-4.jpg",
      },
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-5.jpg",
      },
      {
        previewImageUrl: "/assets/images/dataItems/stories/story-6.jpg",
      },
    ]
  })
  return NextResponse.json({ok: true, count: stories.count});
}