import { ICreateTransactionInputs } from '@/features/transactions';
import { Transaction } from '@prisma/client';

export async function createTransactionApi(payload: ICreateTransactionInputs) {
  const response = await fetch('/api/transactions', {
    method: 'POST',
    body: JSON.stringify(payload),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data as Transaction;
}
