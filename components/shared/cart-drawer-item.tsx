'use client';

import { cn } from '@/lib/utils';
import React from 'react';

import { CartItemProps } from './cart-item-details/cart-types';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image';
import { CartItemDetailsInfo } from './cart-item-details/cart-item-details-info';
import { CartItemDetailsPrice } from './cart-item-details/cart-item-details-price';

interface Props extends CartItemProps {
  onClickCountButton: (type: 'plus' | 'minus') => void;
  onClickRemove: () => void;
  className?: string;
}

export const CartDrewerItem: React.FC<Props> = ({
  className,
  imageUrl,
  details,
  name,
  price,
  quantity,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        'flex gap-3 rounded-lg bg-white p-3 sm:gap-6 sm:p-5',
        { 'pointer-events-none opacity-50': disabled },
        className
      )}
    >
      <CartItemDetailsImage src={imageUrl} />

      <div className="min-w-0 flex-1">
        <CartItemDetailsInfo name={name} details={details} />

        <hr className="my-3" />
        <div className="flex items-center justify-between gap-2">
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-1 sm:gap-3">
            <CartItemDetailsPrice value={price} />
            <button
              type="button"
              aria-label={`Удалить ${name} из корзины`}
              className="rounded p-2 text-gray-400 hover:text-gray-600"
              onClick={onClickRemove}
            >
              <Trash2Icon size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
