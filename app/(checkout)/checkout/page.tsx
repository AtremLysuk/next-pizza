"use client";
import {CheckoutSidebar, Container, Title} from "@/components/shared";
import {useForm, FormProvider} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCart} from "@/hooks";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalInfo,
  checkoutFormSchema,
} from "@/components/shared/checkout";
import {
  TCheckoutFormValues
} from "@/components/shared/checkout/checkout-form-schema";
import {createOrder} from "@/app/actions";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {Api} from "@/services/api-clien";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const [submiting, setSubmiting] = useState(false);

  const {totalAmount, updateItemQuantity, items, removeCartItem, loading} =
    useCart();

  const {data: session} = useSession();

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
      const [firstName, lastName] = data.fullName.split(" ");

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
      console.log("Submit");
      const result = await createOrder(data);

      if (result?.paymentUrl) {
        window.location.href = result.paymentUrl;
      }
      toast.success("Заказ успешно оформлен! 📝 Переход на оплату... ", {
        icon: "✅",
      });
    } catch (error) {
      console.log(error);
      // setSubmiting(false);
      toast.error("не удалось создать заказ", {
        icon: "❌",
      });
    }
  };
  const onClickCountButton = (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20s">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalInfo
                className={loading ? "opacity-30 pointer-events-none" : ""}
              />

              <CheckoutAddressForm
                className={loading ? "opacity-30 pointer-events-none" : ""}
              />
            </div>

            <div className="w-[450px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}

function fetchUserInf() {
  throw new Error("Function not implemented.");
}

