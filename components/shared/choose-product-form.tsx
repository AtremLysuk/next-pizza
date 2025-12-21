import {cn} from '@/lib/utils';
import {Title} from './title';
import {Button} from '../ui';

interface Props {
  imageUrl: string;
  className?: string;
  name: string;
  price: number;
  onSubmit?: () => void;
  loading?: boolean;
}

export const ChooseProductForm: React.FC<Props> = ({
                                                     className,
                                                     name,
                                                     imageUrl,
                                                     price,
                                                     onSubmit,
                                                     loading,
                                                   }) => {
  return (
    <div className={cn(className, 'flex flex-1')}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px] transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title
          text={name}
          size="md"
          className="font-extrabold mb-1"
        />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price}
        </Button>
      </div>
    </div>
  );
};
