import { CardWithTransactions } from '@/features/cards';

export async function getCardApi(id: string) {
  const response = await fetch(`/api/cards/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return data as CardWithTransactions;
}
