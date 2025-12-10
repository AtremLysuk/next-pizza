import { FC } from 'react';

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
}

export const PayOrderTemplate: FC<Props> = ({
  orderId,
  totalAmount,
  paymentUrl,
}) => (
  <div>
    <h1>Заказ #{orderId}</h1>
    <p>
      Оплатите заказ на сумму: {totalAmount} ₴.
      <a href={paymentUrl}>Перейдите по этой ссылке для оплаты заказа</a>
    </p>
  </div>
);
