import {
  Container,
  FiltersPanel,
  FiltersPanelSkeleton,
  ProductsGroupList,
  Stories,
  Title,
} from "@/components/shared";
import { TopBar } from "@/components/shared/top-bar";
import { findPizzas, type GetSearchParams } from "@/lib/find-pizzas";
import { Suspense } from "react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

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
  const visibleCategories = categories.filter(
    (category) => category.products.length > 0,
  );

  return (
    <>
      <Container className="mt-6 md:mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar categories={visibleCategories} />

      <Stories />

      <Container className="pb-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-[60px]">
          <Suspense fallback={<FiltersPanelSkeleton />}>
            <FiltersPanel />
          </Suspense>

          <div className="min-w-0 flex-1">
            {visibleCategories.length > 0 ? (
              <div className="flex flex-col gap-16">
                {visibleCategories.map((category) => (
                  <ProductsGroupList
                    key={category.id}
                    title={category.name}
                    categoryId={category.id}
                    items={category.products}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center py-16 text-center">
                <img
                  src="/assets/images/empty-box.png"
                  alt=""
                  width={120}
                  height={120}
                  className="mb-4"
                />
                <Title
                  text="Ничего не нашлось"
                  size="md"
                  className="mb-2 font-extrabold"
                />
                <p className="mb-6 max-w-sm text-gray-500">
                  По выбранным фильтрам товаров нет. Попробуйте изменить
                  условия или сбросьте фильтры.
                </p>
                {/* Нужна полная перезагрузка: только так сбрасывается состояние фильтров (useFilters читает URL один раз) */}
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                  href="/"
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-11 px-6",
                  )}
                >
                  Сбросить фильтры
                </a>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
