import { getCardsApi } from '@/features/cards';
import { useQuery } from '@tanstack/react-query';

export const useCards = () => {
  const { data, error, isFetching } = useQuery(['cards'], getCardsApi);

  return { data, error, isFetching };
};
