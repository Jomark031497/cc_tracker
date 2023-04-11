import { getCardApi } from '@/features/cards';
import { useQuery } from '@tanstack/react-query';

export const useCard = (id: string) => {
  const { data, error, isFetching } = useQuery(['card'], async () => getCardApi(id), {
    enabled: !!id,
  });

  return { data, error, isFetching };
};
