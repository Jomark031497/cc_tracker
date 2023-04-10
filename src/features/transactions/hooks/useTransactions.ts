import { getTransactionsApi } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

export const useTransactions = () => {
  const { data, error, isFetching } = useQuery(['transactions'], getTransactionsApi);

  return { data, error, isFetching };
};
