"use client";

import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui";
import { buttonVariants } from "../ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { CartDrewerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/lib";
import { PizzaType, PizzaSize } from "@/constants/pizza";
import Image from "next/image";
import { Title } from "./title";
import { useCart } from "@/hooks";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    totalAmount,
    updateItemQuantity,
    items,
    removeCartItem,
    flushPendingUpdates,
  } = useCart();
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  // Перед переходом на checkout отправляем на сервер все отложенные изменения
  const onClickCheckout = async (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    setRedirecting(true);
    await flushPendingUpdates();
    router.push("/checkout");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex w-full flex-col gap-0 bg-[#F4F1EE] p-0 sm:max-w-md">
        <SheetHeader
          className={cn("px-4 pt-5 sm:px-6", !totalAmount && "sr-only")}
        >
          <SheetTitle>
            В корзине <span className="font-bold">{items.length}</span>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Здесь вы можете изменить количество товаров или перейти к оформлению
            заказа.
          </SheetDescription>
        </SheetHeader>

        {!totalAmount && (
          <div className="mx-auto flex h-full w-72 max-w-full flex-col items-center justify-center px-4">
            <Image
              src="/assets/images/empty-box.png"
              alt=""
              width={120}
              height={120}
            />
            <Title
              size="sm"
              text="Корзина пустая"
              className="my-2 text-center font-bold"
            />
            <p className="mb-5 text-center text-neutral-500">
              Добавьте хотя бы один товар в корзину
            </p>

            <SheetClose asChild>
              <Button className="h-12 w-56 text-base" size="lg">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Вернуться назад
              </Button>
            </SheetClose>
          </div>
        )}

        {totalAmount > 0 && (
          <>
            <div className="mt-4 flex-1 overflow-auto px-4 sm:px-6">
              <div className="flex flex-col gap-2 pb-2">
                {items.map((item) => (
                  <CartDrewerItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    name={item.name}
                    details={getCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize,
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

            <SheetFooter className="bg-white p-4 sm:p-8">
              <div className="w-full">
                <div className="mb-4 flex">
                  <span className="flex flex-1 text-lg text-neutral-500">
                    Итого
                    <span className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
                  </span>
                  <span className="text-lg font-bold">{totalAmount} ₴</span>
                </div>

                <Link
                  href="/checkout"
                  onClick={onClickCheckout}
                  aria-disabled={redirecting}
                  className={cn(
                    buttonVariants(),
                    "h-12 w-full text-base",
                    redirecting && "pointer-events-none opacity-80",
                  )}
                >
                  {redirecting ? (
                    <Loader2
                      className="h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <>
                      Оформить заказ
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
