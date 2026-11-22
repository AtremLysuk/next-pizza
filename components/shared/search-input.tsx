'use client';

import { cn } from '@/lib/utils';
import { Api } from '@/services/api-clien';
import { Product } from '@prisma/client';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [focused, setFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    async () => {
      // Пока пользователь ничего не ввёл — не ходим в API и не показываем список
      const query = searchQuery.trim();
      if (!query) {
        setProducts([]);
        return;
      }

      try {
        const res = await Api.products.search(query);
        setProducts(res);
      } catch (error) {
        console.error(error);
      }
    },
    250,
    [searchQuery]
  );

  const onClickItem = () => {
    setFocused(false);
    setSearchQuery('');
    setProducts([]);
  };

  // Список рендерим только когда он реально виден: иначе браузер скачивает картинки впустую
  const showResults = focused && products.length > 0;

  return (
    <>
      {focused && (
        <div className="fixed inset-0 z-30 bg-black/50" aria-hidden="true" />
      )}
      <div
        className={cn(
          'relative z-30 flex h-11 flex-1 justify-between rounded-2xl',
          className
        )}
        ref={ref}
      >
        <Search
          className="absolute left-3 top-1/2 h-5 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />
        <input
          className="w-full rounded-2xl bg-gray-50 pl-11 outline-none"
          type="search"
          placeholder="Найти пиццу..."
          aria-label="Поиск по меню"
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {showResults && (
          <div className="absolute top-12 z-30 w-full rounded-xl bg-white py-2 shadow-md">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                scroll={false}
                onClick={onClickItem}
                className="flex w-full items-center gap-3 px-3 py-2 hover:bg-primary/10"
              >
                <Image
                  src={`/${product.imageUrl}`}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-sm object-contain"
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
