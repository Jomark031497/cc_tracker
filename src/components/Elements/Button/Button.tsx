import { ButtonHTMLAttributes, ReactNode } from 'react';
import cx from 'classnames';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={cx(
        'p-2 rounded-lg transition-all shadow-xl bg-primary-main text-white font-semibold hover:bg-primary-dark',
        className,
      )}
    >
      {children}
    </button>
  );
};
