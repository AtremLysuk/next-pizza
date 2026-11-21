import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';
import { calcOrderTotal } from '@/lib';

interface Props {
  totalAmount: number;
  loading: boolean;
}

const ValueSkeleton = () => <Skeleton className="h-6 w-16 rounded-[6px]" />;

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {
  const { itemsPrice, vatPrice, deliveryPrice, total } =
    calcOrderTotal(totalAmount);
  const isEmpty = !loading && totalAmount <= 0;

  return (
    <WhiteBlock className="p-6 lg:sticky lg:top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">{total} ₴</span>
        )}
      </div>

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-1 text-gray-300" aria-hidden="true" />
            Стоимость товаров:
          </div>
        }
        value={loading ? <ValueSkeleton /> : `${itemsPrice} ₴`}
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-1 text-gray-300" aria-hidden="true" />
            Налоги:
          </div>
        }
        value={loading ? <ValueSkeleton /> : `${vatPrice} ₴`}
      />

      <CheckoutItemDetails
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-1 text-gray-300" aria-hidden="true" />
            Доставка:
          </div>
        }
        value={loading ? <ValueSkeleton /> : `${deliveryPrice} ₴`}
      />

      <Button
        type="submit"
        className="mt-6 h-14 w-full rounded-2xl text-base font-bold"
        loading={loading}
        disabled={isEmpty}
      >
        Перейти к оплате
        <ArrowRight className="ml-2 w-5" aria-hidden="true" />
      </Button>
    </WhiteBlock>
  );
};
