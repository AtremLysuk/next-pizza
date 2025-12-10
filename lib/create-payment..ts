import axios from 'axios';
import { PaymentData } from './../@types/payment';

interface Props {
  decription: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const { data } = await axios.post<PaymentData>(
    'http: paymentUrl',
    {
      amount: {
        value: details.amount,
        currency: 'UAH',
      },
      capture: true,
      decription: details.decription,
      metadata: {
        order_id: details.orderId,
      },
      confirmation: {
        type: 'redirect',
        return_url: process.env.PAYMENT_CALLBACK_URL,
      },
    },
    {
      auth: {
        username: process.env.STRIPE_SECRET_KEY as string,
        password: process.env.STRIPE_SECRET_KEY as string,
      },
      headers: {
        'Content-Type': 'application/json',
        'Idempotence-key': Math.random().toString(36).substring(7),
      },
    }
  );

  return data;
}
