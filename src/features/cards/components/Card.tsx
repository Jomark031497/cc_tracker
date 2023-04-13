import { formatToCurrency } from '@/utils/formatToCurrency';
import { paymentNetworkIcons } from '@/utils/paymentNetworkIcons';
import { Card as ICard } from '@prisma/client';
import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';

interface Props {
  card: ICard;
}

export const Card = ({ card }: Props) => {
  const IconComponent = paymentNetworkIcons(card.network);

  return (
    <Link
      href={`/cards/${card.id}`}
      className="grid h-28 grid-cols-4 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 px-2 py-2 text-white shadow-xl"
    >
      <div className="col-span-3 flex items-center gap-2">
        <IconComponent className="rounded-full border border-gray-500 bg-white p-1 text-4xl text-black" />
        <div>
          <p className="mb-1 text-sm font-bold">{card.name}</p>
          <p className="text-sm">
            Available Credit: <strong>{formatToCurrency(card.creditLimit)}</strong>
          </p>
        </div>
      </div>

      <button className="col-span-1 self-start justify-self-end rounded-full bg-black/50 p-1 text-lg transition-all hover:bg-black/30">
        <HiChevronRight />
      </button>

      <div className="col-span-4 justify-self-end text-right">
        <p className="text-xs font-semibold">Outstanding Balance</p>
        <p className="text-lg font-bold">{formatToCurrency(card.oustandingBalance)}</p>
      </div>
    </Link>
  );
};
