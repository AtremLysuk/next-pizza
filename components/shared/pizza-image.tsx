import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  imageUrl: string;
  size: number;
}

export const PizzaImage: React.FC<Props> = ({ size, imageUrl, className }) => {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-1 items-center justify-center",
        className,
      )}
    >
      <img
        className={cn(
          "relative left-2 top-2 object-contain transition-all duration-300",
          {
            "h-[75%] w-[75%]": size === 20,
            "h-[85%] w-[85%]": size === 30,
            "h-[95%] w-[95%]": size === 40,
          },
        )}
        src={imageUrl}
        alt=""
      />
    </div>
  );
};
