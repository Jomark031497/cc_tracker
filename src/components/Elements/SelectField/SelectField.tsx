import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import cx from 'classnames';

interface Props extends InputHTMLAttributes<HTMLSelectElement> {
  label: string;
  formError?: FieldError;
  className?: string;
  children: ReactNode;
}

export const SelectField = forwardRef<HTMLSelectElement, Props>(
  ({ label, formError, className, children, ...rest }, ref) => {
    return (
      <div className={cx('mb-4 flex flex-col', className)}>
        <label className={'block text-sm font-semibold text-gray-500'}>
          {label}
          <select
            {...rest}
            ref={ref}
            className="mt-1 w-full rounded border-2 bg-white p-3 leading-tight text-gray-700 shadow outline-none transition-all hover:border-primary-main focus:border-primary-main"
          >
            {children}
          </select>
        </label>
        {formError && <p className="mt-1 text-sm text-red-500">{formError.message}</p>}
      </div>
    );
  },
);
