import { cx } from '@/utils/combineClassNames';

interface Props {
  className?: string;
}

export const CardSkeleton = ({ className }: Props) => {
  return (
    <div role="status" className="w-full animate-pulse rounded-xl bg-gray-100">
      <div
        className={cx(
          'flex h-28 w-full items-center justify-center rounded bg-gray-300',
          className,
        )}
      />
    </div>
  );
};
