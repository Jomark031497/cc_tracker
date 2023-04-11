import { getTransactionsApi } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

export const useTransactions = () => {
  const { data, error, isFetching } = useQuery(['transactions'], getTransactionsApi, {
    keepPreviousData: true,
  });

  return { data, error, isFetching };
};
