import { getCartDetails } from '@/lib';
import { Api } from '@/services/api-clien';
import { CreateCartItemValues } from '@/services/dto/cart.dto';
import { create } from 'zustand';

export type CartStateItem = {
  disabled?: boolean;
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;
  addCartItem: (values: any) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      const { items, totalAmount } = getCartDetails(data);

      set({ items, totalAmount });
    } catch (error) {
      console.log(error);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateItemQuantity(id, quantity);
      const { items, totalAmount } = getCartDetails(data);

      set({ items, totalAmount });

      console.log(items);
    } catch (error) {
      console.log(error);
      console.log('!!!!!ERRRR');
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        items: state.items.map((item) =>
          item.id === id ? { ...item, disabled: true } : item
        ),
      }));
      const data = await Api.cart.removeCartItem(id);
      const { items, totalAmount } = getCartDetails(data);

      set({ items, totalAmount });
    } catch (error) {
      console.log(error);
      console.log('!!!!!ERRRR');
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },

  addCartItem: async (values: CreateCartItemValues) => {
    console.log(values);
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      const { items, totalAmount } = getCartDetails(data);

      set({ items, totalAmount });

      console.log(items);
    } catch (error) {
      console.log(error);
      console.log('!!!!!ERRRROORRR');
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
