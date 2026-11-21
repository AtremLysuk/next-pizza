import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Container, Title } from "@/components/shared";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Next Pizza | Ошибка входа",
};

// Коды ошибок NextAuth → понятный текст для пользователя
const ERROR_MESSAGES: Record<string, string> = {
  OAuthSignin: "Не удалось начать вход через этот сервис. Попробуйте другой способ входа.",
  OAuthCallback: "Сервис входа вернул ошибку. Попробуйте ещё раз или выберите другой способ.",
  OAuthCreateAccount: "Не удалось создать аккаунт через этот сервис. Попробуйте другой способ входа.",
  OAuthAccountNotLinked:
    "Этот email уже зарегистрирован другим способом. Войдите тем способом, которым регистрировались.",
  AccessDenied: "Доступ запрещён.",
  Configuration: "Вход временно недоступен. Попробуйте позже.",
};

const DEFAULT_MESSAGE = "Что-то пошло не так при входе. Попробуйте ещё раз.";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const { error } = await searchParams;
  const code = Array.isArray(error) ? error[0] : error;
  const message = (code && ERROR_MESSAGES[code]) || DEFAULT_MESSAGE;

  return (
    <Container className="flex flex-col items-center py-16 text-center md:py-24">
      <img
        src="/assets/images/lock.png"
        alt=""
        width={160}
        height={160}
        className="mb-6 h-auto w-32 md:w-40"
      />

      <Title text="Не удалось войти" size="lg" className="mb-3 font-extrabold" />

      <p className="mb-8 max-w-md text-gray-500">{message}</p>

      <Link
        href="/"
        className={cn(buttonVariants(), "h-12 gap-2 px-6 text-base")}
      >
        <ArrowLeft className="h-5 w-5" aria-hidden="true" />
        На главную
      </Link>
    </Container>
  );
}
