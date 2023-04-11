import { IUpdateCardInputs } from '@/features/cards';
import { Transaction } from '@prisma/client';

export async function updateTransactionApi(id: string, payload: IUpdateCardInputs) {
  const response = await fetch(`/api/transactions/${id}`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data as Transaction;
}
