import { updateCartTotalAmount } from '@/lib';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';


export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { params } = context;
    const paramsId = await params;
    const id = Number(paramsId.id);
    const data = (await req.json()) as { quantity: number };
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: id,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item  not found' });
    }

    await prisma.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity: data.quantity,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[Cart Patch] error', error);
    return NextResponse.json({ message: ' error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { params } = context;
    const paramsId = await params;
    const id = Number(paramsId.id);
    const token = req.cookies.get('cartToken')?.value;

    if (!token) return NextResponse.json({ error: 'Cart token not found' });

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: id,
      },
    });

    if (!cartItem) return NextResponse.json({ error: 'CartItem not found' });

    await prisma.cartItem.delete({
      where: {
        id: id,
      },
    });

    const updatedUserCart = await updateCartTotalAmount(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[Cart Patch] error', error);
    return NextResponse.json({ message: ' error' }, { status: 500 });
  }
}


