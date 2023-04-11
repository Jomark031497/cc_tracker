import { getCardsApi } from '@/features/cards';
import { useQuery } from '@tanstack/react-query';

export const useCards = () => {
  const { data, error, isFetching } = useQuery(['cards'], getCardsApi, {
    keepPreviousData: true,
  });

  return { data, error, isFetching };
};
