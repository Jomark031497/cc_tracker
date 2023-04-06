import { UpdateCard } from '@/features/cards';
import { useModal } from '@/hooks/useModal';
import { formatToCurrency } from '@/utils/formatToCurrency';
import { Card as ICard } from '@prisma/client';
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
    <>
      <div className="px-2 py-2 rounded-xl bg-orange-200 shadow-xl grid grid-cols-4 gap-0 hover:bg-orange-300 transition-all">
        <div className="flex items-center gap-2 col-span-3">
          {icon}
          <div>
            <p className="font-semibold mb-1 text-sm">{card.name}</p>
            <p className="text-xs">
              Available Credit: <strong>{formatToCurrency(card.creditLimit)}</strong>
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setActiveCard(card);
            open();
          }}
          className="col-span-1 text-lg justify-self-end self-start p-1 bg-gray-200 rounded-full hover:bg-primary-main transition-all hover:text-white"
        >
          <HiChevronRight />
        </button>

        <div className="col-span-4 text-right justify-self-end">
          <p className="text-xs">Outstanding Balance</p>
          <p className="text- font-bold">{formatToCurrency(7897)}</p>
        </div>
      </div>
      {activeCard && <UpdateCard card={activeCard} close={close} isOpen={isOpen} />}
    </>
  );
};
