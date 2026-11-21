import {
  Container,
  Filters,
  ProductsGroupList,
  Stories,
  Title,
} from "@/components/shared";
import { TopBar } from "@/components/shared/top-bar";

import { findPizzas, type GetSearchParams } from "@/lib/find-pizzas";
import { Suspense } from "react";

type RawSearchParams = Record<string, string | string[] | undefined>;

// В App Router значение query-параметра может быть массивом,
// если параметр продублирован (?sizes=20&sizes=30).
// Берём первое значение, чтобы привести данные к ожидаемому GetSearchParams.
const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

function normalizeParams(raw: RawSearchParams): GetSearchParams {
  return {
    query: first(raw.query),
    sortBy: first(raw.sortBy),
    sizes: first(raw.sizes),
    pizzaTypes: first(raw.pizzaTypes),
    ingredients: first(raw.ingredients),
    priceFrom: first(raw.priceFrom),
    priceTo: first(raw.priceTo),
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const raw = await searchParams;
  const categories = await findPizzas(normalizeParams(raw));

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      <Stories />

      <Container className="pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      title={category.name}
                      key={category.id}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

