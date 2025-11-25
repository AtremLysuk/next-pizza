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
        'flex bg-white p-5 gap-6',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <CartItemDetailsImage src={imageUrl} />

      <div className="flex-1">
        <CartItemDetailsInfo name={name} details={details} />

        <hr className="my-3" />
        <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItemDetailsPrice value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={onClickRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
