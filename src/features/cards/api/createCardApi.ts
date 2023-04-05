import { ICreateCardInputs } from '@/features/cards';
import { Card } from '@prisma/client';

export async function createCardApi(payload: ICreateCardInputs) {
  const response = await fetch('/api/cards', {
    method: 'POST',
    body: JSON.stringify(payload),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(JSON.stringify(data));

  return data as Card;
}
