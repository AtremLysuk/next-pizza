import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Button } from '../ui';
import { CircleUser, User } from 'lucide-react';
import Link from 'next/link';

interface Props {
  onClickSignIn?: () => void;
  className?: string;
}

export const ProfileButton: React.FC<Props> = ({
  onClickSignIn,
  className,
}) => {
  const { data: session } = useSession();

  return (
    <div className={cn('', className)}>
      {!session ? (
        <Button
          onClick={onClickSignIn}
          variant="outline"
          className="flex items-center gap-1"
          aria-label="Войти"
        >
          <User size={16} />
          <span className="hidden sm:inline">Войти</span>
        </Button>
      ) : (
        <Button
          asChild
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Link href="/profile" aria-label="Профиль">
            <CircleUser size={18} />
            <span className="hidden sm:inline">Профиль</span>
          </Link>
        </Button>
      )}
    </div>
  );
};
