import { getCartDetails } from '@/lib';
import { Api } from '@/services/api-clien';
import type { CartDTO, CreateCartItemValues } from '@/services/dto/cart.dto';
import toast from 'react-hot-toast';
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
  fetchCartItems: (options?: { force?: boolean }) => Promise<void>;
  updateItemQuantity: (id: number, quantity: number) => void;
  flushPendingUpdates: () => Promise<void>;
  addCartItem: (values: CreateCartItemValues) => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
}

// Задержка перед отправкой изменения количества на сервер
const UPDATE_DELAY_MS = 400;

// Служебное состояние синхронизации. Лежит вне стора: компонентам его видеть не нужно,
// а изменения здесь не должны вызывать перерисовки
type PendingUpdate = { timer: ReturnType<typeof setTimeout>; quantity: number };

const pendingUpdates = new Map<number, PendingUpdate>(); // ждут отправки (debounce)
const latestRequests = new Map<number, number>(); // номер последнего отправленного запроса по позиции
const inFlight = new Set<Promise<void>>(); // запросы, которые сейчас идут
let requestCounter = 0;

const hasUnsyncedChanges = () =>
  pendingUpdates.size > 0 || latestRequests.size > 0;

const sumPrices = (items: CartStateItem[]) =>
  items.reduce((sum, item) => sum + item.price, 0);

export const useCartStore = create<CartState>((set, get) => {
  // Отправляет количество на сервер и применяет ответ, только если он ещё актуален
  const sendQuantity = (id: number, quantity: number) => {
    const requestId = ++requestCounter;
    latestRequests.set(id, requestId);

    const request = (async () => {
      let data: CartDTO | null = null;

      try {
        data = await Api.cart.updateItemQuantity(id, quantity);
      } catch (error) {
        console.error(error);
      }

      const isLatest = latestRequests.get(id) === requestId;
      if (isLatest) latestRequests.delete(id);

      if (!data) {
        toast.error('Не удалось изменить количество');
        await get().fetchCartItems({ force: true });
        return;
      }

      // Применяем ответ, только если это последний запрос по позиции
      // и других несинхронизированных изменений не осталось
      if (isLatest && !hasUnsyncedChanges()) {
        set(getCartDetails(data));
      }
    })();

    inFlight.add(request);
    request.finally(() => inFlight.delete(request));
    return request;
  };

  return {
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    fetchCartItems: async ({ force = false } = {}) => {
      try {
        set({ loading: true, error: false });
        const data = await Api.cart.getCart();

        // Не затираем оптимистичные значения, пока изменения не дошли до сервера
        if (!force && hasUnsyncedChanges()) return;

        set(getCartDetails(data));
      } catch (error) {
        console.error(error);
        set({ error: true });
      } finally {
        set({ loading: false });
      }
    },

    updateItemQuantity: (id, quantity) => {
      if (quantity < 1) return;

      // 1. Оптимистично: сразу меняем количество, цену позиции и итог
      set((state) => {
        const items = state.items.map((item) => {
          if (item.id !== id) return item;

          const unitPrice = item.price / item.quantity;
          return { ...item, quantity, price: Math.round(unitPrice * quantity) };
        });

        return { items, totalAmount: sumPrices(items), error: false };
      });

      // 2. Debounce: отменяем прошлую отложенную отправку и ставим новую
      const pending = pendingUpdates.get(id);
      if (pending) clearTimeout(pending.timer);

      const timer = setTimeout(() => {
        pendingUpdates.delete(id);
        void sendQuantity(id, quantity);
      }, UPDATE_DELAY_MS);

      pendingUpdates.set(id, { timer, quantity });
    },

    flushPendingUpdates: async () => {
      // Отправляем всё, что ждёт, прямо сейчас…
      pendingUpdates.forEach(({ timer, quantity }, id) => {
        clearTimeout(timer);
        void sendQuantity(id, quantity);
      });
      pendingUpdates.clear();

      // …и дожидаемся всех запросов, включая уже отправленные раньше
      await Promise.all(Array.from(inFlight));
    },

    removeCartItem: async (id) => {
      // Изменения количества этой позиции больше не нужны
      const pending = pendingUpdates.get(id);
      if (pending) clearTimeout(pending.timer);
      pendingUpdates.delete(id);
      latestRequests.delete(id);

      // Оптимистично убираем позицию сразу
      set((state) => {
        const items = state.items.filter((item) => item.id !== id);
        return { items, totalAmount: sumPrices(items), error: false };
      });

      try {
        const data = await Api.cart.removeCartItem(id);
        if (!hasUnsyncedChanges()) set(getCartDetails(data));
      } catch (error) {
        console.error(error);
        toast.error('Не удалось удалить товар');
        await get().fetchCartItems({ force: true });
      }
    },

    addCartItem: async (values) => {
      try {
        set({ loading: true, error: false });
        const data = await Api.cart.addCartItem(values);
        set(getCartDetails(data));
      } catch (error) {
        console.error(error);
        set({ error: true });
        throw error;
      } finally {
        set({ loading: false });
      }
    },
  };
});
