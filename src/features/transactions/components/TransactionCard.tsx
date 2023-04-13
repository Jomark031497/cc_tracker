import { ITransactionWithCard } from '@/features/transactions';
import { formatToCurrency } from '@/utils/formatToCurrency';
import { format } from 'date-fns';
import Link from 'next/link';

interface Props {
  transaction: ITransactionWithCard;
}

export const TransactionCard = ({ transaction }: Props) => {
  return (
    <Link
      href={`/transactions/${transaction.id}`}
      className="mb-2 grid grid-cols-3 gap-1 rounded-xl bg-white p-2 text-gray-500 shadow"
    >
      <p className="col-span-2 font-semibold">{transaction.name}</p>
      <p className="col-span-1 justify-self-end text-sm">{formatToCurrency(transaction.amount)}</p>
      <p className="col-span-3 text-sm">{format(new Date(transaction.date), 'MMMM dd, yyyy')}</p>
      <p className="col-span-3 text-sm font-semibold">{transaction.card.name}</p>
    </Link>
  );
};
