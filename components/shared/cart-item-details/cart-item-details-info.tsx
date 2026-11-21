import { cn } from '@/lib/utils';

interface Props {
  name: string;
  details: string;
  className?: string;
}

export const CartItemDetailsInfo: React.FC<Props> = ({
  name,
  details,
  className,
}) => {
  return (
    <div className={cn('min-w-0', className)}>
      <p className="text-lg font-bold leading-6">{name}</p>
      {details.length > 0 && (
        <p className="text-xs text-gray-500">{details}</p>
      )}
    </div>
  );
};
