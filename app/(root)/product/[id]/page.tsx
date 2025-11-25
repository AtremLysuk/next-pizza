import { Container, ProductForm } from '@/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import { use } from 'react';

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = use(
    prisma.product.findFirst({
      where: { id: Number(id) },
      include: {
        ingredients: true,
        category: {
          include: {
            products: {
              include: {
                items: true,
              },
            },
          },
        },
        items: true,
      },
    })
  );

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product} />
    </Container>
  );
}
