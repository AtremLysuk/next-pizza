import {cn} from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  imageUrl: string;
  size: number;
}

export const PizzaImage: React.FC<Props> = ({size, imageUrl, className}) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center flex-1 relative w-full',
        className
      )}
    >
      <img
        className={cn('relative left-2 top-2 transition-all a-10 duration-300', {
          'w-[75%] h-[75%]': size === 20,
          'w-[85%] h-[85%]': size === 30,
          'w-[95%] h-[95%]': size === 40,
        })}
        src={imageUrl}
        alt="logo"
      />

    </div>
  );
};
