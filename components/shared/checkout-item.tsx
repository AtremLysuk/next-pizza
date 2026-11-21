import { cn } from "@/lib/utils";
import React from "react";
import { X } from "lucide-react";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import { CartItemDetailsInfo } from "./cart-item-details/cart-item-details-info";
import { CartItemDetailsPrice } from "./cart-item-details/cart-item-details-price";
import { CartItemProps } from "./cart-item-details/cart-types";
import { CountButton } from "./count-button";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
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
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6",
        { "pointer-events-none opacity-50": disabled },
        className,
      )}
    >
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <CartItemDetailsImage src={imageUrl} />
        <CartItemDetailsInfo name={name} details={details} className="flex-1" />
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-6">
        <CartItemDetailsPrice value={price} className="sm:w-20 sm:text-right" />

        <div className="flex items-center gap-2 sm:gap-4">
          <CountButton
            onClick={onClickCountButton}
            value={quantity}
            className="flex items-center gap-4"
          />
          <button
            type="button"
            aria-label={`Удалить ${name} из заказа`}
            className="rounded p-2 text-gray-400 hover:text-gray-600"
            onClick={onClickRemove}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
