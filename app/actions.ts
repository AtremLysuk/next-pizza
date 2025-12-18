"use server";

;

import {
  TCheckoutFormValues
} from "@/components/shared/checkout/checkout-form-schema";
import {sendEmail} from "@/lib";
import {getUserSession} from "@/lib/get-user-session";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus, Prisma} from "@prisma/client";
import {hashSync} from "bcrypt";
import {cookies} from "next/headers";
import {
  VerificationUserTemplate
} from "@/components/shared/email-templates/verification-user";

import {
  paymentRequiredTemplate
} from "@/components/shared/email-templates/my-paylink-mail";
import {mySemdMail} from "@/lib/my-send-mail";
import createWayForPayPayment from "@/lib/wayforpay";


type OrderItemType = {
  name: string;
  price: number;
  quantity: number;
}

export async function createOrder(data: TCheckoutFormValues) {
  try {
    const cookiesStore = await cookies();

    const cartToken = cookiesStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    if (!userCart || userCart.totalAmount === 0) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    const orderItems: OrderItemType[] = userCart.items.map((item) => ({
      name: item.productItem.product.name,
      price: Math.round(item.productItem.price / 100),
      quantity: item.quantity,
    }))
    const order = await prisma.order.create({
      data: {
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        token: cartToken,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: orderItems,
      },
    });

    const paymentUrl = await createWayForPayPayment({
      orderId: order.id,
      amount: order.totalAmount,
      email: order.email,
      items: orderItems,
    });

    const mailResult = await mySemdMail(
      data.email,
      paymentRequiredTemplate(String(order.id), order.totalAmount, paymentUrl, orderItems)
    );

    if (!
      mailResult.success
    ) {
      throw new Error("Failed to send payment email");
    }
    console.log("!!!!Mail is Sended");
    console.log("Order created successfully:");

    return {
      orderId: order.id,
      paymentUrl,
    };
  } catch
    (error) {
    console.error("[CREATE_ORDER_ERROR]", error);

    throw new Error(
      `Failed to create order: ${
        error instanceof Error ? error.message : "Failed to create order"
      }`
    );
  }

}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("User not found");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password,
      },
    });
  } catch (error) {
    console.log("Error [Update_User]", error);
    throw new Error("Failed to update user info");
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Mail dosn't verified");
      }

      throw new Error("User already exists");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password as string, 10),
        verified: new Date(),
      },
    });

    const code = Math.floor(100000 + Math.random() * 9000000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "Next Pizza / Подтвердите регистрацию",
      VerificationUserTemplate({code})
    );
  } catch (error) {
    console.log("Error [Register_User]", error);
    throw new Error("Failed to register user");
  }
}
