import { FC } from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput, FormTextarea } from '../form-components';

interface Props {
  className?: string;
}

export const CheckoutAddressForm: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3.Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">
        <FormInput
          name="address"
          className="text-base"
          placeholder="Адрес доставки"
          required
        />
        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Комментарий к заказу"
        />
      </div>
    </WhiteBlock>
  );
};
