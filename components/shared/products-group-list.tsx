'use client';
import { useIntersection } from 'react-use';
import React, { useEffect, useRef } from 'react';
import { Title } from './title';
import { useCategoryStore } from '@/store/category';
import { ProductCard } from './product-card';
import { cn } from '@/lib/utils';
import { ProductWithRelations } from '@/@types/prisma';
import { ingredients } from '@/prisma/constants';

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  listClassName?: string;
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  className,
  title,
  items,
  categoryId,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={390}
            count={1}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
