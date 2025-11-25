import { useEffect } from 'react';
import { useFilters, type Filters } from './use-filters';
import { useRouter, useSearchParams } from 'next/navigation';
import * as qs from 'qs';

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, {
      arrayFormat: 'comma',
    });

    const currentSearchParams = searchParams.toString();

    if (currentSearchParams === query) return;

    router.replace(`?${query}`, { scroll: false });
  }, [filters]);
};
