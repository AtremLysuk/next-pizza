"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import { Category } from "@prisma/client";
import React, { useEffect, useRef } from "react";

interface Props {
  className?: string;
  items: Category[];
}

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  const listRef = useRef<HTMLDivElement>(null);

  // При смене активной категории прокручиваем список так, чтобы она была по центру
  useEffect(() => {
    const list = listRef.current;
    const activeLink = list?.querySelector<HTMLAnchorElement>(
      '[aria-current="true"]',
    );
    if (!list || !activeLink) return;

    list.scrollTo({
      left:
        activeLink.offsetLeft -
        list.clientWidth / 2 +
        activeLink.offsetWidth / 2,
      behavior: "smooth",
    });
  }, [categoryActiveId]);

  // Прокручиваем к разделу сами: без хэша в адресе и без записи в истории браузера
  const onClickCategory = (
    event: React.MouseEvent<HTMLAnchorElement>,
    name: string,
  ) => {
    event.preventDefault();
    document
      .getElementById(name)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={listRef}
      className={cn(
        "relative inline-flex max-w-full gap-1 overflow-x-auto scrollbar-none [@media(hover:hover)_and_(pointer:fine)]:scrollbar-thin [@media(hover:hover)_and_(pointer:fine)]:pb-2 bg-gray-50 p-1 rounded-2xl",
        className,
      )}
    >
      {items.map(({ name, id }) => (
        <a
          key={id}
          href={`/#${name}`}
          onClick={(event) => onClickCategory(event, name)}
          aria-current={categoryActiveId === id ? "true" : undefined}
          className={cn(
            "flex shrink-0 items-center whitespace-nowrap font-bold h-11 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary",
          )}
        >
          {name}
        </a>
      ))}
    </div>
  );
};
