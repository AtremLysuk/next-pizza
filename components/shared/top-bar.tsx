import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';
import { Category } from '@prisma/client';

interface Props {
  className?: string;
  categories: Category[];
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div
      className={cn(
        'sticky top-0 z-10 bg-white py-3 shadow-lg shadow-black/5 md:py-5',
        className
      )}
    >
      <Container className="flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <Categories items={categories} className="min-w-0" />
        <SortPopup className="shrink-0" />
      </Container>
    </div>
  );
};
