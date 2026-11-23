"use client";

import React, { useEffect, useRef } from "react";
import { useIntersection } from "react-use";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";

interface Props {
  /** id секции — по нему работают ссылки категорий */
  id: string;
  categoryId: number;
  className?: string;
  children: React.ReactNode;
}

/**
 * Клиентская обёртка секции категории: отслеживает прокрутку и подсвечивает
 * активную категорию. Содержимое (children) рендерится на сервере и не гидратируется
 */
export const CategorySection: React.FC<Props> = ({
  id,
  categoryId,
  className,
  children,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Секция активна, когда пересекает узкую полосу на 20% от верха экрана
  const intersection = useIntersection(
    sectionRef as React.RefObject<HTMLElement>,
    {
      rootMargin: "-20% 0px -79% 0px",
      threshold: 0,
    },
  );

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveCategoryId]);

  return (
    <div
      id={id}
      ref={sectionRef}
      className={cn("scroll-mt-40 md:scroll-mt-28", className)}
    >
      {children}
    </div>
  );
};
