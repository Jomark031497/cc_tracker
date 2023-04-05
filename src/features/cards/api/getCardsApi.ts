import { Card } from '@prisma/client';

export async function getCardsApi() {
  const response = await fetch('/api/cards', {
    method: 'GET',
  });

  const data = await response.json();

  if (!response.ok) throw new Error(JSON.stringify(data));

  return data as Card[];
}
