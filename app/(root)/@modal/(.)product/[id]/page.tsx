import {ChooseProductModal} from '@/components/shared';
import {prisma} from '@/prisma/prisma-client';
import {notFound} from 'next/navigation';
import {use} from 'react';

export default function ProductModalPage({
                                           params,
                                         }: {
  params: Promise<{ id: string }>;
}) {
  const {id} = use(params);

  const product = use(
    prisma.product.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        ingredients: true,
        items: true,
      },
    })
  );


  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
