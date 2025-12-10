import { FC } from "react";
import { WhiteBlock } from "../white-block";
import { FormInput } from "../form-components";

interface Props {
  className?: string;
}

export const CheckoutPersonalInfo: FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2.Персональные данные" className={className}>
      <div className="grid grid-cols-2 gap-5">
        <FormInput
          name="firstName"
          className="text-base"
          placeholder="Имя"
          required
        />
        <FormInput
          name="lastName"
          className="text-base"
          placeholder="Фамилия"
          required
        />
        <FormInput
          name="email"
          className="text-base"
          placeholder="E-mail"
          required
        />
        <FormInput
          name="phone"
          className="text-base"
          placeholder="Телефон"
          required
        />
      </div>
    </WhiteBlock>
  );
};
