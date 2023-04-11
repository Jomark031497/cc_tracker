import { Transaction } from '@prisma/client';

export async function getTransactionApi(id: string) {
  const response = await fetch(`/api/transactions/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data as Transaction;
}
