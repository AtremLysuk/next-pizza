import React from "react";
import { cn } from "@/lib/utils";
import { ProductWithRelations } from "@/@types/prisma";
import { Title } from "./title";
import { ProductCard } from "./product-card";
import { CategorySection } from "./category-section";

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  /** Первая группа на странице: первые карточки грузим сразу */
  eagerImages?: boolean;
  listClassName?: string;
  className?: string;
}

// Серверный компонент: карточки рендерятся на сервере и не гидратируются.
// Отслеживание прокрутки — в клиентской обёртке CategorySection
export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  eagerImages = false,
  listClassName,
  className,
}) => {
  return (
    <CategorySection id={title} categoryId={categoryId} className={className}>
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
    </CategorySection>
  );
};
