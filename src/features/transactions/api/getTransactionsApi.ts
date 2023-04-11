import { ITransactionWithCard } from '@/features/transactions';

export async function getTransactionsApi() {
  const response = await fetch('/api/transactions', {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data as ITransactionWithCard[];
}
