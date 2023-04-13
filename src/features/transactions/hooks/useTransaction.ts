import { getTransactionApi } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

export const useTransaction = (id: string) => {
  return useQuery(['transactions'], async () => getTransactionApi(id), { keepPreviousData: true });
};
