"use client";

import { useEffect, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { Filters } from "./filters";

// Общие размеры колонки фильтров на десктопе — для панели и для скелетона
const DESKTOP_COLUMN = "lg:w-[250px] lg:shrink-0";

/** Заглушка того же размера, пока фильтры грузятся: место зарезервировано, ничего не прыгает */
export const FiltersPanelSkeleton: React.FC = () => (
  <>
    <div className="h-10 w-[116px] animate-pulse rounded-md bg-gray-100 lg:hidden" />
    <div className={cn("hidden lg:block", DESKTOP_COLUMN)}>
      <div className="h-[560px] animate-pulse rounded-3xl bg-gray-50" />
    </div>
  </>
);

export const FiltersPanel: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Пока панель открыта: блокируем прокрутку страницы под ней и закрываем по Esc
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <Button
        variant="outline"
        className="flex items-center gap-2 self-start lg:hidden"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="filters-panel"
      >
        <SlidersHorizontal size={16} />
        Фильтры
      </Button>

      {/* Мобилка: затемнение на весь экран. Десктоп: липкая колонка слева */}
      <div
        className={cn(
          "fixed inset-0 z-50 items-center justify-center bg-black/50 p-4 sm:p-12",
          open ? "flex" : "hidden",
          "lg:sticky lg:inset-auto lg:top-28 lg:z-auto lg:block lg:self-start lg:bg-transparent lg:p-0",
          DESKTOP_COLUMN,
        )}
        onClick={() => setOpen(false)}
      >
        <aside
          id="filters-panel"
          role={open ? "dialog" : undefined}
          aria-modal={open || undefined}
          aria-label="Фильтры"
          className={cn(
            "relative max-h-full w-full max-w-md overflow-y-auto rounded-3xl bg-white p-5 shadow-xl sm:max-w-xl sm:p-7",
            "lg:max-h-[calc(100vh-8rem)] lg:max-w-none lg:p-5 lg:scrollbar-thin",
          )}
          onClick={(event) => event.stopPropagation()}
        >
          <Button
            variant="ghost"
            size="icon"
            aria-label="Закрыть фильтры"
            className="absolute right-3 top-3 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <X size={20} />
          </Button>

          <Filters />

          <Button
            className="mt-6 w-full lg:hidden"
            onClick={() => setOpen(false)}
          >
            Показать пиццы
          </Button>
        </aside>
      </div>
    </>
  );
};
