'use server';

import { TCheckoutFormValues } from '@/components/shared/checkout/checkout-form-schema';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';

export async function createOrder(formData: FormData) {
  const data = Object.entries(formData);

  console.log(data);
  const token = '123';

  await prisma.order.create({
    data: {
      fullName: data.firstName + ' ' + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      comment: data.comment,
      token: token,
      totalAmount: 1500,
      status: OrderStatus.PENDING,
      cart: {},
    },
  });
}
