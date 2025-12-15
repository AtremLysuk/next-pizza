import { orderSuccessTemplate } from "@/components/shared/email-templates/pay-order";
import { sendEmail } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import crypto from "crypto";
import { NextResponse } from "next/server";

const MERCHANT_SECRET = process.env.WAYFORPAY_MERCHANT_SECRET!;

function generateSignature(data: string) {
  return crypto.createHmac("md5", MERCHANT_SECRET).update(data).digest("hex");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { orderReference, status, amount, currency, merchantSignature } =
      body;

    const signatureString = [orderReference, status, amount, currency].join(
      ";"
    );

    const expectedSignature = generateSignature(signatureString);

    if (expectedSignature !== merchantSignature) {
      console.log("Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: Number(orderReference) },
    });

    if (!order) {
      console.log("Order not found:", orderReference);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (order.status === OrderStatus.PAID) {
      return NextResponse.json({
        orderReference,
        status: "accept",
      });
    }

    if (status === "Approved") {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.PAID,
        },
      });
    }

    console.log("📧 Sending success email to:", order.email);

    await sendEmail(
      order.email,
      "Next Pizza — Оплата подтверждена 🍕",
      orderSuccessTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
      })
    );

    console.log("✅ Success email sent");

    const cart = await prisma.cart.findFirst({
      where: {
        token: order.token,
      },
    });

    if (cart) {
      await prisma.cartItem.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          totalAmount: 0,
        },
      });
    }

    if (status === "Declined") {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.CANCELLED,
        },
      });
    }

    return NextResponse.json({
      orderReference,
      status: "accept",
    });
  } catch (error) {
    console.log("Webhook error:", error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
