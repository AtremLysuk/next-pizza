import React, { FC } from 'react';
import { RequiredSymbol } from '../required-symbol';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';
import { ErrorText } from '../error-text';
import { ClearButton } from '../clear-button';
import { Textarea } from '@/components/ui';

interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={cn(className)}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Textarea
          className="h-12 text-md"
          {...register(name)}
          {...props}
          rows={5}
        />
        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={String(errorText)} />}
    </div>
  );
};
