'use client';

import {cn} from '@/lib/utils';
import {Title} from './title';
import {Button} from '../ui';
import {PizzaImage} from './pizza-image';
import {PizzaSize, PizzaType, pizzTypes} from '@/constants/pizza';
import {GroupVariants} from './group-variants';
import {IngredientItem} from './ingidient-item';
import {Ingredient, ProductItem} from '@prisma/client';

import {usePizzaOptions} from '@/hooks';
import {getPizzaDetails} from '@/lib';

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

  const {totalPrice, textDetails} = getPizzaDetails(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const handleClickAdd = () => {
    if (currentItemId) {
      onSubmit(currentItemId, Array.from(selectedIngredients));
    }
  };

  return (
    <div className={cn(className, 'flex content-between')}>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <PizzaImage
          imageUrl={`/${imageUrl}`}
          size={size}
        />
      </div>


      <div className='w-full md:w-1/2 bg-[#f7f6f5] p-6 md:p-7 flex flex-col max-h-[90vh] overflow-y-auto scrollbar'>
        <Title
          text={name}
          size="md"
          className="font-extrabold mb-1"
        />

        <p className="text-gray-400">{textDetails}</p>

        <div className="flex flex-col gap-5 mt-5">
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

        <div className="bg-gray-50 p-5 rounded-md max-h-[300px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
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
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
          onClick={handleClickAdd}
        >
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  );
};
