import { TCheckoutFormValues } from '@/components/shared/checkout/checkout-form-schema';
import { prisma } from '@/prisma/prisma-client';
import { OrderStatus } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const token = '123';

    const order = await prisma.order.create({
      data: {
        fullName: body.firstName + ' ' + body.lastName,
        email: body.email,
        phone: body.phone,
        address: body.address,
        comment: body.comment,
        token: token,
        totalAmount: 1500,
        status: OrderStatus.PENDING,
        items: [],
      },
    });

    return NextResponse.json({ success: true, order: order }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: 'Order creation failed' },
      { status: 500 }
    );
  }
}
