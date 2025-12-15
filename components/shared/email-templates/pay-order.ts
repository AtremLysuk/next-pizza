export const orderSuccessTemplate = ({
  orderId,
  totalAmount,
}: {
  orderId: number;
  totalAmount: number;
}) => {
  const amountUah = Math.round(totalAmount / 100);

  return {
    subject: `Оплата заказа #${orderId} подтверждена`,
    html: `
      <h2>Спасибо за заказ! 🍕</h2>
      <p>Заказ №${orderId} успешно оплачен.</p>
      <p>Сумма: <strong>${amountUah} грн</strong></p>
    `,
  };
};
