'use client';
import { CheckoutSidebar, Container, Title } from '@/components/shared';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCart } from '@/hooks';
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalInfo,
  checkoutFormSchema,
} from '@/components/shared/checkout';
import { TCheckoutFormValues } from '@/components/shared/checkout/checkout-form-schema';
import { cn } from '@/lib/utils';
import { createOrder } from '@/app/actions';

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart();

  const form = useForm<TCheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  const onSubmit: SubmitHandler<TCheckoutFormValues> = (data) => {
    console.log(data);
    createOrder(data);
  };

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
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
                className={loading ? 'opacity-30 pointer-none' : ''}
              />

              <CheckoutAddressForm
                className={loading ? 'opacity-30 pointer-none' : ''}
              />
            </div>

            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
