import { calcTotalPizzaPrice } from './calc-total-pizza-prices';
import { PizzaType, PizzaSize, mapPizzaType } from '@/constants/pizza';
import { ProductItem, Ingredient } from '@prisma/client';

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const textDetails = `${size}см ${mapPizzaType[type]} тесто`;

  return {
    totalPrice,
    textDetails
  }
};
