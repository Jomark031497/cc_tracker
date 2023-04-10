import { UpdateCard } from '@/features/cards';
import { useModal } from '@/hooks/useModal';
import { formatToCurrency } from '@/utils/formatToCurrency';
import { Card as ICard } from '@prisma/client';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';

interface Props {
  card: ICard;
  icon: ReactNode;
}

export const Card = ({ card, icon }: Props) => {
  const { open, isOpen, close } = useModal();
  const [activeCard, setActiveCard] = useState<ICard | null>(null);

  return (
    <Link
      href={`/wallets/${card.id}`}
      className="px-2 py-2 rounded-xl bg-gradient-to-tr from-red-600 text-white to-orange-500 shadow-xl grid grid-cols-4"
    >
      <div className="flex items-center gap-2 col-span-3">
        {icon}
        <div>
          <p className="font-bold mb-1 text-sm">{card.name}</p>
          <p className="text-sm">
            Available Credit: <strong>{formatToCurrency(card.creditLimit)}</strong>
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          setActiveCard(card);
          open();
        }}
        className="col-span-1 text-lg justify-self-end self-start p-1 bg-black/50 rounded-full transition-all hover:bg-black/30"
      >
        <HiChevronRight />
      </button>

      <div className="col-span-4 text-right justify-self-end">
        <p className="text-xs font-semibold">Outstanding Balance</p>
        <p className="text- font-bold">{formatToCurrency(card.oustandingBalance)}</p>
      </div>

      {activeCard && <UpdateCard card={activeCard} close={close} isOpen={isOpen} />}
    </Link>
  );
};
