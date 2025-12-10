import { FC } from "react";

interface Props {
  code: string;
}

export const VerificationUserTemplate: FC<Props> = ({ code }) => (
  <div>
    <p>
      Код подтверждения: <h2>{code}</h2>
    </p>
    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
        Подтвердите регистрацию
      </a>
    </p>
  </div>
);
