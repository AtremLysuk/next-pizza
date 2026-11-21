import { cn } from "@/lib/utils";
import { Title } from "./title";
import { Button } from "../ui";

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
    <div className={cn("flex flex-col md:flex-row", className)}>
      <div className="flex h-[280px] items-center justify-center p-6 sm:h-[360px] md:h-auto md:w-1/2">
        <img
          src={imageUrl}
          alt=""
          className="h-full max-h-[350px] w-auto max-w-full object-contain"
        />
      </div>

      <div className="flex flex-col bg-[#f7f6f5] p-5 md:w-1/2 md:p-7">
        <Title text={name} size="md" className="mb-1 font-extrabold" />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className="mt-6 h-[55px] w-full rounded-[18px] px-10 text-base md:mt-10"
        >
          Добавить в корзину за {price} ₴
        </Button>
      </div>
    </div>
  );
};
