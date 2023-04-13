import { Button } from '@/components/Elements';
import { UpdateCard, useCard } from '@/features/cards';
import { useModal } from '@/hooks/useModal';
import { formatToCurrency } from '@/utils/formatToCurrency';
import { paymentNetworkIcons } from '@/utils/paymentNetworkIcons';
import { format } from 'date-fns';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default function Wallet() {
  const router = useRouter();
  const id = router.query.id as string;

  const { open, isOpen, close } = useModal();

  const { data: card } = useCard(id);
  if (!card) return <p>...loading</p>;

  const IconComponent = paymentNetworkIcons(card.network);

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-semibold text-gray-500">Account Details</p>

        <Button variant="outlined" onClick={() => open()}>
          Manage Card
        </Button>
      </div>

      {card && (
        <div className="mb-4 grid grid-cols-4 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 px-2 py-2 text-white shadow-xl">
          <div className="col-span-3 flex items-center gap-2">
            <IconComponent className="rounded-full border border-gray-500 bg-white p-1 text-4xl text-black" />
            <div>
              <p className="mb-1 font-bold">{card.name}</p>
              <p className="text-sm">
                Available Credit: <strong>{formatToCurrency(card.creditLimit)}</strong>
              </p>
            </div>
          </div>

          <div className="col-span-4 justify-self-end text-right">
            <p className="text-sm font-semibold">Outstanding Balance</p>
            <p className="font-bold">{formatToCurrency(card.oustandingBalance)}</p>
          </div>
        </div>
      )}

      <div>
        <p className="mb-4 text-lg font-semibold text-gray-600">Transactions</p>

        <div className="flex flex-col gap-2 px-2">
          {card.transactions?.map((transaction) => {
            return (
              <div
                key={transaction.id}
                className="mb-2 grid grid-cols-3 gap-1 rounded-xl bg-white p-2 text-gray-500 shadow"
              >
                <p className="col-span-2 font-semibold">{transaction.name}</p>
                <p className="col-span-1 justify-self-end text-sm">
                  - {formatToCurrency(transaction.amount)}
                </p>
                <p className="col-span-3 text-sm">
                  {format(new Date(transaction.date), 'MMMM dd, yyyy')}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <UpdateCard card={card} close={close} isOpen={isOpen} />
    </>
  );
}
