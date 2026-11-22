"use client";

import { cn } from "@/lib/utils";
import { Container } from "./container";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ProfileButton } from "./profile-button";

// Модалка входа с формами грузится отдельным чанком только при первом открытии
const AuthModal = dynamic(
  () => import("./modals/auth-modal").then((mod) => mod.AuthModal),
  { ssr: false },
);

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: FC<Props> = ({
  className,
  hasSearch = true,
  hasCart = true,
}) => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = useState(false);

  const searchParams = useSearchParams();

  useEffect(() => {
    let toastMessage = "";
    if (searchParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
    }
    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена!";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, {
          duration: 1000,
        });
      }, 500);
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex flex-wrap items-center justify-between gap-y-4 py-4 md:flex-nowrap md:py-8">
        <Link href="/">
          <div className="flex items-center gap-2 md:gap-4">
            <Image src="/header/logo.png" alt="logo" width={35} height={35} />
            <div>
              <h1 className="text-xl uppercase font-black md:text-2xl">
                Next Pizza
              </h1>
              <p className="text-sm text-gray-500 leading-3">
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="order-last w-full md:order-none md:mx-10 md:w-auto md:flex-1">
            <SearchInput />
          </div>
        )}

        <div className="flex items-center gap-2 md:gap-3">
          {openAuthModal && (
            <AuthModal
              open={openAuthModal}
              onClose={() => setOpenAuthModal(false)}
            />
          )}
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
