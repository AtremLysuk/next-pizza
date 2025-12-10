import { CheckoutSessionResponse, StripeError } from '@/@types/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CheckoutSessionResponse | StripeError>
) {
  if (req.method === 'POST') {
    try {
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Test Product',
                  description: 'This is a test product for demonstration',
                },
                unit_amount: 2000,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/cancel`,
        });
      res.status(200).json({ id: session.id });
    } catch (err: unknown) {
      console.error('Payment error:', err);

      if (err instanceof Error) {
        const errorResponse: StripeError = { message: err.message };
        res.status(500).json(errorResponse);
      } else {
        const errorResponse: StripeError = {
          message: 'An unknown error occurred',
        };
        res.status(500).json(errorResponse);
      }
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
