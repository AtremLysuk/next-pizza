'use client';
import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Category } from '@prisma/client';
import React from 'react';

interface Props {
  className?: string;
  items: Category[];
}

export const Categories: React.FC<Props> = ({ items, className }) => {

  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn(
        'inline-flex max-w-full gap-1 overflow-x-auto bg-gray-50 p-1 rounded-2xl',
        className
      )}
    >
      {items.map(({ name, id }) => (
        <a
          className={cn(
            'flex shrink-0 items-center whitespace-nowrap font-bold h-11 rounded-2xl px-5',
            categoryActiveId === id &&
              'bg-white shadow-md shadow-gray-200 text-primary'
          )}
          href={`/#${name}`}
          key={id}
        >
          {name}
        </a>
      ))}
    </div>
  );
};
