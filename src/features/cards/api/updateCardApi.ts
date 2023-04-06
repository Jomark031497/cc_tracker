import { IUpdateCardInputs } from '@/features/cards';
import { Card } from '@prisma/client';

export async function updateCardApi(id: string, payload: IUpdateCardInputs) {
  const response = await fetch(`/api/cards/${id}`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data as Card;
}
