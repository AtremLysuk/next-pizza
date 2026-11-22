"use client";

import { useIntersection } from "react-use";
import React, { useEffect, useRef } from "react";
import { Title } from "./title";
import { useCategoryStore } from "@/store/category";
import { ProductCard } from "./product-card";
import { cn } from "@/lib/utils";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  listClassName?: string;
  className?: string;
  eagerImages?: boolean;
}

export const ProductsGroupList: React.FC<Props> = ({
  className,
  title,
  items,
  categoryId,
  listClassName,
  eagerImages,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = useRef<HTMLDivElement>(null);

  // Раздел активен, когда пересекает узкую полосу на 20% от верха экрана
  // (сразу под липкой панелью категорий). Высота раздела при этом не важна
  const intersection = useIntersection(
    intersectionRef as React.RefObject<HTMLElement>,
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
      id={title}
      ref={intersectionRef}
      className={cn("scroll-mt-40 md:scroll-mt-28", className)}
    >
      <Title text={title} size="lg" className="mb-5 font-extrabold" />

      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-[50px]",
          listClassName,
        )}
      >
        {items.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.items[0]?.price ?? 0}
            count={1}
            ingredients={product.ingredients}
            imageUrl={`/${product.imageUrl}`}
            eager={eagerImages && index < 3}
          />
        ))}
      </div>
    </div>
  );
};
