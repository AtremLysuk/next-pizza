'use client';

import { DialogContent, Dialog } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import type { ProductWithRelations } from '@/@types/prisma';
import { DialogTitle } from '@radix-ui/react-dialog';
import { ProductForm } from '../product-form';

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
          'p-0 w-[1060px] max-w-[1060px] min-w-[70dvw]   min-h-[500px] bg-white overflow-hidden',
          className
        )}
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};
