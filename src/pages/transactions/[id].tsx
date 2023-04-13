import { Button } from '@/components/Elements';
import { UpdateTransaction, useTransaction } from '@/features/transactions';
import { useModal } from '@/hooks/useModal';
import { formatToCurrency } from '@/utils/formatToCurrency';
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

export default function TransactionPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { isOpen, open, close } = useModal();

  const { data: transaction, isFetching } = useTransaction(id);
  if (!transaction) return <p>...loading</p>;

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-semibold text-gray-500">Account Details</p>

        <Button variant="outlined" onClick={() => open()}>
          Manage Transaction
        </Button>
      </div>

      {isFetching ? (
        <p>Loading transaction...</p>
      ) : (
        <>
          <div className="rounded-xl bg-white shadow">
            <div className="rounded-t-xl bg-gradient-to-tr from-red-600 to-orange-500 p-2 text-white">
              <p className="mb-1 text-xs font-semibold">Transaction Date</p>
              <p className="text-sm font-semibold">
                {format(new Date(transaction.date), 'MMMM dd, yyyy')}
              </p>
            </div>

            <div className="p-2">
              <div className="grid grid-cols-4 border-b border-dashed p-2">
                <p className="col-span-1 text-sm text-gray-500">Description</p>
                <p className="col-span-3">{transaction.name}</p>
              </div>
              <div className="grid grid-cols-4 p-2">
                <p className="col-span-1 text-sm text-gray-500">Amount</p>
                <p className="col-span-3">{formatToCurrency(transaction.amount)}</p>
              </div>
            </div>
          </div>
          <UpdateTransaction close={close} isOpen={isOpen} transaction={transaction} />
        </>
      )}
    </>
  );
}
