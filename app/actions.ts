'use server';

// import { TCheckoutFormValues } from '@/components/shared/checkout/checkout-form-schema';
// import { prisma } from '@/prisma/prisma-client';
// import { OrderStatus } from '@prisma/client';

// export async function createOrder(data: TCheckoutFormValues) {
//   console.log(data);

//   const token = '123';

//   await prisma.order.create({
//     data: {
//       fullName: data.firstName + ' ' + data.lastName,
//       email: data.email,
//       phone: data.phone,
//       address: data.address,
//       comment: data.comment,
//       token: token,
//       totalAmount: 1500,
//       status: OrderStatus.PENDING,
//       items: [],
//     },
//   });

//   return { url: 'https://nextjs.org/' };
// }

import { TCheckoutFormValues } from '@/components/shared/checkout/checkout-form-schema';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createOrder(data: TCheckoutFormValues) {
  try {
    const token = '123';

    const order = await prisma.order.create({
      data: {
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        token: token,
        totalAmount: 1500,
        status: OrderStatus.PENDING,
        items: [],
      },
    });

    console.log('Order created successfully:', order.id);

    const paymentUrl = 'https://nextjs.org/';
    revalidatePath('/order');

    return {
      success: true,
      url: paymentUrl,
      orderId: order.id,
    };
  } catch (error) {
    console.error('Order creation failed:', error);

    throw new Error(
      `Failed to create order: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}
