export interface CheckoutSessionResponse {
  id: string;
}

export interface StripeError {
  message: string;
  type?: string;
}

export interface PriceData {
  currency: string;
  product_data: {
    name: string;
    description: string;
  };
  unit_amount: number;
}

export interface LineItem {
  price_data: PriceData;
  quantity: number;
}
