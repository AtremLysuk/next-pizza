import { useDebounce } from 'react-use';
import { useRouter, useSearchParams } from 'next/navigation';
import * as qs from 'qs';
import { type Filters } from './use-filters';

// Задержка перед обновлением URL: пока пользователь двигает ползунок
// или быстро щёлкает чекбоксы, на сервер ничего не уходит
const URL_UPDATE_DELAY_MS = 400;

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = qs.stringify(
    {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    },
    { arrayFormat: 'comma' }
  );

  useDebounce(
    () => {
      if (searchParams.toString() === query) return;

      router.replace(`?${query}`, { scroll: false });
    },
    URL_UPDATE_DELAY_MS,
    [query]
  );
};
