"use client";

import {cn} from "@/lib/utils";
import {Container} from "./container";
import {FC, Suspense, useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import {SearchInput} from "./search-input";
import {CartButton} from "./cart-button";
import {useSearchParams} from "next/navigation";
import toast from "react-hot-toast";
import {useSession} from "next-auth/react";
import {ProfileButton} from "./profile-button";
import {AuthModal} from "./modals/auth-modal";
import {useRouter} from "next/navigation";

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
  const {data: session} = useSession();

  useEffect(() => {
    let toastMessage = "";
    if (searchParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту.";
    }
    if (searchParams.has("verified")) {
      toastMessage = "Почта успешно подтверждена!  ";
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
    <header className={cn(" border-b", className)}>
      <Suspense>
        <Container className="flex items-center justify-between py-8">
          <Link href="/">
            <div className="flex items-center gap-4">
              <Image
                src="/header/logo.png"
                alt="logo"
                width={35}
                height={35}
              />
              <div>
                <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
                <p className="text-sm text-gray-400 leading-3">
                  вкусней уже некуда
                </p>
              </div>
            </div>
          </Link>

          {hasSearch && (
            <div className="mx-10 flex-1">
              <SearchInput />
            </div>
          )}

          <div className="flex items-center gap-3">
            <AuthModal
              open={openAuthModal}
              onClose={() => setOpenAuthModal(false)}
            />
            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
            {hasCart && <CartButton />}
          </div>
        </Container>
      </Suspense>

    </header>
  );
};
