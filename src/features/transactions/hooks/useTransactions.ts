import { getTransactionsApi } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

export const useTransactions = () => {
  return useQuery(['transactions'], getTransactionsApi, {
    keepPreviousData: true,
  });
};
