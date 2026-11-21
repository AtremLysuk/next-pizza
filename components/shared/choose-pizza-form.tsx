"use client";

import { cn } from "@/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";
import { PizzaImage } from "./pizza-image";
import { PizzaSize, PizzaType, pizzTypes } from "@/constants/pizza";
import { GroupVariants } from "./group-variants";
import { IngredientItem } from "./ingidient-item";
import { Ingredient, ProductItem } from "@prisma/client";

import { usePizzaOptions } from "@/hooks";
import { getPizzaDetails } from "@/lib";

interface Props {
  imageUrl: string;
  className?: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onSubmit: (itemId: number, ingredients: number[]) => void;
  loading?: boolean;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  className,
  items,
  ingredients,
  name,
  imageUrl,
  onSubmit,
  loading,
}) => {
  const {
    size,
    type,
    selectedIngredients,
    setSize,
    setType,
    addIngredient,
    availableSizes,
    currentItemId,
  } = usePizzaOptions(items);

  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn("flex flex-col md:flex-row", className)}>
      <div className="flex h-[280px] items-center justify-center sm:h-[360px] md:h-auto md:w-1/2">
        <PizzaImage imageUrl={`/${imageUrl}`} size={size} />
      </div>

      <div className="scrollbar flex flex-col bg-[#f7f6f5] p-5 md:w-1/2 md:max-h-[90dvh] md:overflow-y-auto md:p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <p className="text-gray-500">{textDetails}</p>

        <div className="mt-5 flex flex-col gap-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="scrollbar mt-5 rounded-md bg-gray-50 p-3 md:max-h-[300px] md:overflow-auto md:p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={`/${ingredient.imageUrl}`}
                active={selectedIngredients.has(ingredient.id)}
                onClick={() => addIngredient(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          className="mt-6 h-[55px] w-full rounded-[18px] px-10 text-base md:mt-10"
          onClick={handleClickAdd}
        >
          Добавить в корзину за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
