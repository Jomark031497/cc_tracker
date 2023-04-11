import { getCardApi } from '@/features/cards';
import { useQuery } from '@tanstack/react-query';

export const useCard = (id: string) => {
  const { data, error, isFetching } = useQuery(
    ['card'],
    async () => (id ? getCardApi(id) : undefined),
    {
      enabled: !!id,
    },
  );

  return { data, error, isFetching };
};
