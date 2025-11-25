import { cn } from '@/lib/utils';
import React from 'react';
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image';
import { CartItemDetailsInfo } from './cart-item-details/cart-item-details-info';
import { CartItemDetailsPrice } from './cart-item-details/cart-item-details-price';
import { CartItemProps } from './cart-item-details/cart-types';

import { X } from 'lucide-react';
import { CountButton } from './count-button';

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;

  className?: string;
}

interface Props {
  className?: string;
}

export const CheckoutItem: React.FC<Props> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  disabled,
  className,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-10',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetailsImage src={imageUrl} />
        <CartItemDetailsInfo name={name} details={details} />
      </div>

      <CartItemDetailsPrice value={price} />

      <div className="flex gap-5">
        <CountButton
          onClick={onClickCountButton}
          value={quantity}
          className="flex items-center gap-4"
        />
        <button onClick={onClickRemove} type="button">
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
