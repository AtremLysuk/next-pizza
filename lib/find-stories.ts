import { prisma } from "@/prisma/prisma-client";

// Серверная функция: сторис вместе с их слайдами. Только для серверных компонентов
export const findStories = () =>
  prisma.story.findMany({
    include: { items: true },
    orderBy: { id: "asc" },
  });
