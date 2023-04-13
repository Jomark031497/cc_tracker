import { getCardApi } from '@/features/cards';
import { useQuery } from '@tanstack/react-query';

export const useCard = (id: string) => {
  return useQuery(['singleCard'], async () => getCardApi(id), {
    cacheTime: 0,
  });
};
