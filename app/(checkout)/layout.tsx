import {Container, Header} from '@/components/shared';
import type {Metadata} from 'next';
import {Suspense} from "react";

export const metadata: Metadata = {
  title: 'Next Pizza | Корзина',
};

export default function ChekoutLayout({
                                        children,
                                      }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Suspense>
          <Header
            hasCart={false}
            hasSearch={false}
            className="border-gray-200"
          />
        </Suspense>
        {children}
      </Container>
    </main>
  );
}
