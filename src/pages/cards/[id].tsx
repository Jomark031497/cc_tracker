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
      <div className="flex justify-between items-center mb-4">
        <p className="font-semibold text-gray-500">Account Details</p>

        <Button variant="outlined" onClick={() => open()}>
          Manage Card
        </Button>
      </div>

      {card && (
        <div className="px-2 py-2 rounded-xl bg-gradient-to-tr from-red-600 text-white to-orange-500 shadow-xl grid grid-cols-4 mb-4">
          <div className="flex items-center gap-2 col-span-3">
            <IconComponent className="border bg-white text-black border-gray-500 text-4xl rounded-full p-1" />
            <div>
              <p className="font-bold mb-1">{card.name}</p>
              <p className="text-sm">
                Available Credit: <strong>{formatToCurrency(card.creditLimit)}</strong>
              </p>
            </div>
          </div>

          <div className="col-span-4 text-right justify-self-end">
            <p className="text-sm font-semibold">Outstanding Balance</p>
            <p className="font-bold">{formatToCurrency(card.oustandingBalance)}</p>
          </div>
        </div>
      )}

      <div>
        <p className="text-lg text-gray-600 font-semibold mb-4">Transactions</p>

        <div className="flex flex-col gap-2 px-2">
          {card.transactions?.map((transaction) => {
            return (
              <div
                key={transaction.id}
                className="grid grid-cols-3 text-gray-500 gap-1 mb-2 bg-white p-2 rounded-xl shadow"
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
