import { getCardsApi } from '@/features/cards';
import { useQuery } from '@tanstack/react-query';

export const useCards = () => {
  return useQuery(['cards'], getCardsApi, {});
};
