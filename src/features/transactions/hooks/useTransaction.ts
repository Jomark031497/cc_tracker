import { getTransactionApi } from '@/features/transactions';
import { useQuery } from '@tanstack/react-query';

export const useTransaction = (id: string) => {
  const { data, error, isFetching } = useQuery(
    ['transactions'],
    async () => getTransactionApi(id),
    {
      enabled: !!id,
    },
  );

  return { data, error, isFetching };
};
