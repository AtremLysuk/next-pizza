import { cn } from '@/lib/utils';
import { FC } from 'react';

interface Props {
  className?: string;
}

export const CheckoutItemSkeleton: FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <div className={cn('flex items-center gap-5', className)}>
        <div
          className={cn(
            'w-[50px] h-[50px] bg-gray-200 rounded-full animate-pulse'
          )}
        ></div>
        <h2 className={cn('w-40 h-5 bg-gray-200 rounded animate-pulse')}></h2>
      </div>
      <div className="h-5 w-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-8 w-[133px] bg-gray-200 rounded animate-pulse"></div>
    </div>
  );
};
