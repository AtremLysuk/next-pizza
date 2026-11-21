import Link from 'next/link';
import React from 'react';
import { Plus } from 'lucide-react';
import { Ingredient } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { buttonVariants } from '../ui/button';

interface Props {
  id: number;
  name: string;
  price: number;
  count: number;
  imageUrl: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  ingredients,
  imageUrl,
  className,
}) => {
  return (
    <div className={cn('h-full', className)}>
      <Link href={`/product/${id}`} scroll={false} className="group flex h-full flex-col">
        <div className="flex h-[220px] items-center justify-center rounded-lg bg-secondary p-6 md:h-[260px]">
          <img
            src={imageUrl}
            alt=""
            className="h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

        <p className="line-clamp-3 text-sm text-gray-500">
          {ingredients.map((ingredient) => ingredient.name).join(', ')}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-[20px]">
            от <b>{price} ₴</b>
          </span>

          <span
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'text-base font-bold transition-transform duration-300 group-hover:scale-105'
            )}
          >
            <Plus size={20} className="mr-1" aria-hidden="true" />
            Добавить
          </span>
        </div>
      </Link>
    </div>
  );
};
