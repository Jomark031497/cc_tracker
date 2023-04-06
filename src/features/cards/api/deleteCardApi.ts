import { Card } from '@prisma/client';

export async function deleteCardApi(id: string) {
  const response = await fetch(`/api/cards/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message);
  return data as Card;
}
