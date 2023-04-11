import { cx } from '@/utils/combineClassNames';
import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  formError?: FieldError;
  className?: string;
}

export const InputField = forwardRef<HTMLInputElement, Props>(
  ({ label, formError, className, ...rest }, ref) => {
    return (
      <div className={cx('mb-4 flex flex-col', className)}>
        <label className={'block text-sm font-semibold text-gray-500'}>
          {label}
          <input
            {...rest}
            ref={ref}
            className="mt-1 w-full appearance-none rounded border-2 p-3 leading-tight text-gray-700 shadow outline-none transition-all hover:border-primary-main focus:border-primary-main"
          />
        </label>
        {formError && <p className="mt-1 text-sm text-red-500">{formError.message}</p>}
      </div>
    );
  },
);
