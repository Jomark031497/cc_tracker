import { formatToCurrency } from '@/utils/formatToCurrency';
import { Card as ICard } from '@prisma/client';
import { ReactNode } from 'react';

interface Props {
  card: ICard;
  icon: ReactNode;
}

export const Card = ({ card, icon }: Props) => {
  return (
    <div className="px-2 py-2 rounded-xl bg-orange-200 shadow-xl grid grid-cols-2 gap-0 hover:bg-orange-300 transition-all">
      <div className="flex items-center gap-2 col-span-2">
        {icon}
        <div>
          <p className="font-semibold mb-1 text-sm">{card.name}</p>
          <p className="text-xs">
            Available Credit: <strong>{formatToCurrency(card.creditLimit)}</strong>
          </p>
        </div>
      </div>

      <div className="col-span-2 text-right justify-self-end">
        <p className="text-xs">Outstanding Balance</p>
        <p className="text- font-bold">{formatToCurrency(7897)}</p>
      </div>
    </div>
  );
};
