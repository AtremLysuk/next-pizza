import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";
import React from "react";

interface Props {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick: () => void;
  className?: string;
}

export const IngredientItem: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  price,
  active,
  onClick,
}) => {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center rounded-md border border-transparent bg-white p-1 text-center shadow-md",
        active && "border-primary",
        className,
      )}
    >
      {active && (
        <CircleCheck
          aria-hidden="true"
          className="absolute right-2 top-2 text-primary"
        />
      )}
      <img
        src={imageUrl}
        alt=""
        width={110}
        height={110}
        className="h-auto w-full max-w-[110px]"
      />
      <span className="mb-1 text-xs">{name}</span>
      <span className="font-bold">{price} ₴</span>
    </button>
  );
};
