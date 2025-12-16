
type OrderItemType = {
  name: string;
  price: number;
  quantity: number;
}


export const paymentRequiredTemplate = (
  orderId: string,
  totalAmount: number,
  paymentUrl: string,
  items: OrderItemType[],
) => {
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td>${item.name}</td>
          <td align="center">${item.quantity}</td>
          <td align="right">${item.price} грн</td>
          <td align="right">${item.price * item.quantity} грн</td>
        </tr>
      `
    )
    .join("");

  return {
    subject: `Оплата вашего заказа #${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Ваш заказ создан 🍕</h2>

        <p>Номер заказа: <strong>${orderId}</strong></p>

        <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse: collapse; border: 1px solid #ddd;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th align="left">Товар</th>
              <th align="center">Кол-во</th>
              <th align="right">Цена</th>
              <th align="right">Сумма</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>

        <p style="margin-top: 16px; font-size: 16px;">
          <strong>Итого: ${totalAmount} грн</strong>
        </p>

        <div style="text-align: center; margin-top: 24px;">
          <a
            href="${paymentUrl}"
            style="
              background: #28a745;
              color: #ffffff;
              padding: 14px 24px;
              text-decoration: none;
              border-radius: 6px;
              font-size: 16px;
              display: inline-block;
            "
          >
            Оплатить заказ
          </a>
        </div>

        <p style="margin-top: 16px; font-size: 12px; color: #777;">
          Если кнопка не работает, перейдите по ссылке:<br />
          <a href="${paymentUrl}">${paymentUrl}</a>
        </p>
      </div>
    `,
  };
};
