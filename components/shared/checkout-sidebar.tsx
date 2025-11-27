import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';

interface Props {
  totalAmount: number;
  loading: boolean;
}

const VAT = 15;
const DELIVERY_PRICE = 250;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;
  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {totalPrice} ₴
          </span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-1 text-gray-300" />
            Стоимость товаров:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount} ₴`
          )
        }
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-1 text-gray-300" />
            Налоги:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${vatPrice} ₴`
          )
        }
      />
      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-1 text-gray-300" />
            Доставка:
          </div>
        }
        value={
          loading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ₴`
          )
        }
      />

      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
        loading={loading}
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
