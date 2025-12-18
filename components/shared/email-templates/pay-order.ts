export const orderSuccessTemplate = ({
  orderId,
  totalAmount,
}: {
  orderId: number;
  totalAmount: number;
}) => {


  return {
    subject: `Оплата заказа #${orderId} подтверждена`,
    html: `
      <h2>Спасибо за заказ! 🍕</h2>
      <p>Заказ №${orderId} успешно оплачен.</p>
      <p>Сумма: <strong>${totalAmount} грн</strong></p>
    `,
  };
};
