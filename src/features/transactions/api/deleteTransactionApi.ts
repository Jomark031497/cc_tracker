import { Transaction } from '@prisma/client';

export async function deleteTransactionApi(id: string) {
  const response = await fetch(`/api/transactions/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data as Transaction;
}
