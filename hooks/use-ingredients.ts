import { Api } from '@/services/api-clien';
import { Ingredient } from '@prisma/client';
import { useEffect, useState } from 'react';


type IngredientItem = Pick<Ingredient, 'id' | 'name'>;
interface ReternProps {
  ingredients: IngredientItem[];
  loading: boolean;
}


export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<ReternProps['ingredients']>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(
          ingredients.map((ingredient) => ({
            id: ingredient.id,
            name: ingredient.name,
          }))
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients, loading };
};
