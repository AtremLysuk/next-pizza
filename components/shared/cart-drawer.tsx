'use client';

import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrewerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/lib';
import { PizzaType, PizzaSize } from '@/constants/pizza';
import Image from 'next/image';
import { Title } from './title';
import { useCart } from '@/hooks';
import { useState } from 'react';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart();
  const [redirecting, setRedirecting] = useState(false);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>{children}</SheetTrigger>
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
          <div
            className={cn(
              'flex flex-col h-full',
              !totalAmount && 'justify-center'
            )}
          >
            {totalAmount && (
              <SheetHeader>
                <SheetTitle>
                  В корзине <span className="font-bold">{items.length}</span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Здесь вы можете изменить количество товаров или перейти к
                  оформлению заказа.
                </SheetDescription>
              </SheetHeader>
            )}

            {!totalAmount && (
              <div className="flex flex-col items-center w-72 mx-auto">
                <Image
                  src="/assets/images/empty-box.png"
                  alt="empty box"
                  width={120}
                  height={120}
                />
                <Title
                  size="sm"
                  text="корзина пустая"
                  className="text-center font-bold my-2"
                />
                <p className="text-center text-neutral-500 mb-5">
                  Добавьте хотя б один товар в корзину
                </p>

                <SheetClose>
                  <Button className="w-56 h-12 text-base" size="lg">
                    <ArrowLeft className="2-5 mr-2" />
                    Вернуться назад
                  </Button>
                </SheetClose>
              </div>
            )}

            {totalAmount > 0 && (
              <>
                <div className="mx-6 mt-5 overflow-auto flex-1">
                  <div className="mb-2">
                    {items.map((item) => (
                      <CartDrewerItem
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        details={getCartItemDetails(
                          item.ingredients,
                          item.pizzaType as PizzaType,
                          item.pizzaSize as PizzaSize
                        )}
                        price={item.price}
                        quantity={item.quantity}
                        disabled={item.disabled}
                        onClickCountButton={(type) =>
                          onClickCountButton(item.id, item.quantity, type)
                        }
                        onClickRemove={() => removeCartItem(item.id)}
                      />
                    ))}
                  </div>
                </div>

                <SheetFooter className=" bg-white p-8">
                  <div className="w-full">
                    <div className="flex mb-4">
                      <span className="flex flex-1 text-lg text-neutral-500">
                        Итого
                        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
                      </span>
                      <span className="font-bold text-lg">{totalAmount} ₴</span>
                    </div>

                    <Link href="/checkout">
                      <Button
                        onClick={() => setRedirecting(true)}
                        loading={redirecting}
                        type="submit"
                        className="w-full h-12 text-base"
                      >
                        Оформить заказ
                        <ArrowRight className="2-5 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </SheetFooter>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
