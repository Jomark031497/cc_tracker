import { formatToCurrency } from '@/utils/formatToCurrency';
import { Transaction } from '@prisma/client';
import { format } from 'date-fns';

interface Props {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: Props) => {
  return (
    <div className="grid grid-cols-3 text-gray-500 gap-1 mb-2 bg-white p-2 rounded-xl shadow">
      <p className="col-span-2 font-semibold">{transaction.name}</p>
      <p className="col-span-1 justify-self-end text-sm">
        - {formatToCurrency(transaction.amount)}
      </p>
      <p className="col-span-3 text-sm"> {format(new Date(transaction.date), 'MMMM dd, yyyy')}</p>
    </div>
  );
};
