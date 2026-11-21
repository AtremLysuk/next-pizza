"use client";

import { DialogContent, Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import type { ProductWithRelations } from "@/@types/prisma";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ProductForm } from "../product-form";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        aria-describedby={undefined}
        className={cn(
          // Общее
          "gap-0 overflow-y-auto border-0 bg-white p-0 shadow-xl",
          // Мобилка: по центру, отступы растут с шириной экрана
          "left-4 right-4 top-1/2 w-auto max-w-none translate-x-0 -translate-y-1/2 sm:left-12 sm:right-12 sm:max-w-none",
          "max-h-[calc(100dvh-2rem)] rounded-3xl sm:max-h-[calc(100dvh-5rem)]",
          // Десктоп: окно по центру фиксированной ширины
          "md:left-1/2 md:right-auto md:w-[80dvw] md:max-w-[1060px] md:-translate-x-1/2",
          "md:min-h-[500px] md:overflow-hidden",
          className,
        )}
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
