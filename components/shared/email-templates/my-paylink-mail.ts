export const paymentRequiredTemplate = (
  orderId: string,
  totalAmount: number,
  paymentUrl: string
) => ({
  subject: `Оплата вашего заказа #${orderId}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <h2 style="color: #333;">Ваш заказ создан!</h2>

      <p>
        Номер заказа: <strong>${orderId}</strong>
      </p>

      <p>
        Сумма к оплате: <strong>${totalAmount} грн</strong>
      </p>

      <p style="margin-top: 20px;">
        Для завершения оформления — нажмите на кнопку ниже и оплатите заказ:
      </p>

      <a
        href="${paymentUrl}"
        style="
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          padding: 12px 20px;
          text-decoration: none;
          border-radius: 8px;
          font-size: 16px;
          margin-top: 10px;
        "
      >
        Оплатить заказ
      </a>

      <p style="margin-top: 20px; color: #777; font-size: 14px;">
        Если кнопка не работает, перейдите по ссылке:
        <br />
        <a href="${paymentUrl}">${paymentUrl}</a>
      </p>
    </div>
  `,
});
