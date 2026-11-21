import { FC } from 'react';
import Link from 'next/link';
import { CheckoutItem } from '../checkout-item';
import { WhiteBlock } from '../white-block';
import { PizzaSize, PizzaType } from '@/constants/pizza';
import { getCartItemDetails } from '@/lib';
import { CartStateItem } from '@/store';
import { CheckoutItemSkeleton } from './checkout-item-skeleton';

interface Props {
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;
  className?: string;
}

export const CheckoutCart: FC<Props> = ({
  items,
  onClickCountButton,
  removeCartItem,
  loading,
}) => {
  return (
    <WhiteBlock title="1. Корзина">
      <div className="flex flex-col gap-5">
        {loading &&
          [...Array(2)].map((_, index) => <CheckoutItemSkeleton key={index} />)}

        {!loading && items.length === 0 && (
          <div className="py-6 text-center">
            <p className="mb-3 text-gray-500">Корзина пуста</p>
            <Link href="/" className="font-bold text-primary hover:underline">
              Перейти в каталог
            </Link>
          </div>
        )}

        {!loading &&
          items.map((item) => (
            <CheckoutItem
              key={item.id}
              id={item.id}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(
                item.ingredients,
                item.pizzaType as PizzaType,
                item.pizzaSize as PizzaSize
              )}
              disabled={item.disabled}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onClickCountButton={(type) =>
                onClickCountButton(item.id, item.quantity, type)
              }
              onClickRemove={() => removeCartItem(item.id)}
            />
          ))}
      </div>
    </WhiteBlock>
  );
};
