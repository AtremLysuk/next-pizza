// Ставка налога (%) и стоимость доставки (₴). Используются и на клиенте, и на сервере
export const VAT_PERCENT = 15;
export const DELIVERY_PRICE = 250;

export interface OrderTotal {
  itemsPrice: number;
  vatPrice: number;
  deliveryPrice: number;
  total: number;
}

/** Итог заказа по стоимости товаров. Пустая корзина — все нули */
export const calcOrderTotal = (itemsPrice: number): OrderTotal => {
  if (itemsPrice <= 0) {
    return { itemsPrice: 0, vatPrice: 0, deliveryPrice: 0, total: 0 };
  }

  const vatPrice = Math.round((itemsPrice * VAT_PERCENT) / 100);

  return {
    itemsPrice,
    vatPrice,
    deliveryPrice: DELIVERY_PRICE,
    total: itemsPrice + vatPrice + DELIVERY_PRICE,
  };
};
