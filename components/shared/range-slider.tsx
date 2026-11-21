"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

type SliderProps = {
  className?: string;
  min: number;
  max: number;
  step: number;
  formatLabel?: (value: number) => string;
  value?: number[] | readonly number[];
  onValueChange?: (values: number[]) => void;
};

const THUMB_LABELS = ["Минимальная цена", "Максимальная цена"];

export const RangeSlider = React.forwardRef<HTMLDivElement, SliderProps>(
  function RangeSlider(
    { className, min, max, step, formatLabel, value, onValueChange, ...props },
    ref,
  ) {
    const initialValue = Array.isArray(value) ? value : [min, max];
    const [localValues, setLocalValues] = React.useState(initialValue);

    React.useEffect(() => {
      setLocalValues(Array.isArray(value) ? value : [min, max]);
    }, [min, max, value]);

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues);
      onValueChange?.(newValues);
    };

    return (
      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={localValues}
        onValueChange={handleValueChange}
        className={cn(
          "relative mb-6 flex w-full touch-none select-none items-center",
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>

        {localValues.map((thumbValue, index) => {
          // Положение бегунка в процентах от ширины трека
          const percent = ((thumbValue - min) / (max - min)) * 100;

          return (
            <React.Fragment key={index}>
              <div
                className="absolute top-[10px] whitespace-nowrap"
                style={{
                  left: `${percent}%`,
                  // Сдвиг на тот же процент собственной ширины:
                  // у левого края подпись выровнена влево, у правого — вправо
                  transform: `translateX(-${percent}%)`,
                }}
                aria-hidden="true"
              >
                <span className="text-sm">
                  {formatLabel ? formatLabel(thumbValue) : thumbValue}
                </span>
              </div>

              <SliderPrimitive.Thumb
                aria-label={THUMB_LABELS[index]}
                className="block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              />
            </React.Fragment>
          );
        })}
      </SliderPrimitive.Root>
    );
  },
);
