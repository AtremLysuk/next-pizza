import { CartItemDTO } from '@/services/dto/cart.dto';
import { FC } from 'react';

interface Props {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: FC<Props> = ({ orderId, items }) => (
  <div>
    <h1>Спасибо за покупку!</h1>
    <p>Ваш заказ #{orderId} оплачен. Список товаровЖ</p>

    <ul>
      {items.map((item, i) => (
        <li key={i}>{item.productItem.product.name}</li>
      ))}
    </ul>
  </div>
);
