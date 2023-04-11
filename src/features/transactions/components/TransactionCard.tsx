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
      className="grid grid-cols-3 text-gray-500 gap-1 mb-2 bg-white p-2 rounded-xl shadow"
    >
      <p className="col-span-2 font-semibold">{transaction.name}</p>
      <p className="col-span-1 justify-self-end text-sm">
        - {formatToCurrency(transaction.amount)}
      </p>
      <p className="col-span-3 text-sm">{format(new Date(transaction.date), 'MMMM dd, yyyy')}</p>
      <p className="col-span-3 text-sm font-semibold">{transaction.card.name}</p>
    </Link>
  );
};
