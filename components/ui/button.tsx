'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Loader } from 'lucide-react';

import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonVariantProps } from './button-variants';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
  loading?: boolean;
  submiting?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, children, disabled, loading, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {!loading ? children : <Loader className="h-5 w-5 animate-spin" />}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
