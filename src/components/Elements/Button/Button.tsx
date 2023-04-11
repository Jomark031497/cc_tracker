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
          'py-2 rounded-lg px-6 transition-all text-sm font-semibold',
          variant === 'contained'
            ? 'bg-primary-main text-white font-semibold hover:bg-primary-light'
            : 'border border-primary-main text-primary-main hover:bg-primary-light hover:text-white hover:border-primary-light',
          className,
        )}
      >
        {children}
      </button>
    );
  },
);
