"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CheckoutSidebar, Container, Title } from "@/components/shared";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/hooks";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalInfo,
  checkoutFormSchema,
} from "@/components/shared/checkout";
import { TCheckoutFormValues } from "@/components/shared/checkout/checkout-form-schema";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/services/api-clien";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const [submiting, setSubmiting] = useState(false);

  const {
    totalAmount,
    updateItemQuantity,
    items,
    removeCartItem,
    loading,
    flushPendingUpdates,
  } = useCart();

  const { data: session } = useSession();

  const form = useForm<TCheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();
      const [firstName = "", lastName = ""] = data.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", data.email);
    }

    if (session) {
      fetchUserInfo();
    }
  }, [session]);

  const onSubmit = async (data: TCheckoutFormValues) => {
    try {
      setSubmiting(true);
      // Сначала отправляем на сервер все отложенные изменения корзины
      await flushPendingUpdates();
      const result = await createOrder(data);

      if (result?.paymentUrl) {
        window.location.assign(result.paymentUrl);
      }
      toast.success("Заказ успешно оформлен! 📝 Переход на оплату... ", {
        icon: "✅",
      });
    } catch (error) {
      console.log(error);
      setSubmiting(false);
      toast.error("Не удалось создать заказ", {
        icon: "❌",
      });
    }
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus",
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  const blockClassName = loading ? "pointer-events-none opacity-30" : "";

  return (
    <Container className="mt-6 max-w-3xl pb-14 md:mt-10 lg:max-w-[1280px]">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Вернуться в каталог
      </Link>

      <Title
        text="Оформление заказа"
        className="mb-6 text-[28px] font-extrabold md:mb-8 md:text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
            <div className="flex min-w-0 flex-1 flex-col gap-6 lg:gap-10">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalInfo className={blockClassName} />

              <CheckoutAddressForm className={blockClassName} />
            </div>

            <div className="w-full lg:w-[450px] lg:shrink-0">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submiting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
