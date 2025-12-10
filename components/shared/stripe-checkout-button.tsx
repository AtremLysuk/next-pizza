// // components/StripeCheckoutButton.tsx
// 'use client';

// import { loadStripe } from '@stripe/stripe-js';
// import { useState } from 'react';

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// interface CartItem {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   quantity: number;
//   images?: string[];
// }

// interface StripeCheckoutButtonProps {
//   items: CartItem[];
//   className?: string;
// }

// export default function StripeCheckoutButton({
//   items,
//   className,
// }: StripeCheckoutButtonProps) {
//   const [loading, setLoading] = useState(false);

//   const handleCheckout = async () => {
//     setLoading(true);

//     try {
//       const response = await fetch('/api/checkout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ items }),
//       });

//       const { id: sessionId } = await response.json();

//       if (!sessionId) {
//         throw new Error('No session ID received');
//       }

//       const stripe = await stripePromise;

//       if (!stripe) {
//         throw new Error('Stripe failed to load');
//       }

//       const { error } = await stripe.redirectToCheckout({ sessionId });

//       if (error) {
//         console.error('Stripe redirect error:', error);
//         alert('Payment failed: ' + error.message);
//       }
//     } catch (error: any) {
//       console.error('Checkout error:', error);
//       alert('Checkout failed: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const total = items.reduce(
//     (sum, item) => sum + item.price * item.quantity,
//     0
//   );

//   return (
//     <button
//       onClick={handleCheckout}
//       disabled={loading || items.length === 0}
//       className={`bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
//     >
//       {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
//     </button>
//   );
// }
