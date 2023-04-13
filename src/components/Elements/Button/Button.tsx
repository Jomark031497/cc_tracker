import { cx } from '@/utils/combineClassNames';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
  variant?: 'contained' | 'outlined';
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, variant = 'contained', className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={cx(
          'rounded-full px-6 py-2 text-sm font-semibold transition-all',
          variant === 'contained'
            ? 'bg-primary-main font-semibold text-white hover:bg-primary-light'
            : 'border border-primary-main text-primary-main hover:border-primary-main hover:bg-primary-main hover:text-white',
          className,
        )}
      >
        {children}
      </button>
    );
  },
);
