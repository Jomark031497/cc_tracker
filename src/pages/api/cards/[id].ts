import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  const id = req.query.id as string;

  if (req.method === 'GET') {
    const card = await prisma.card.findUnique({
      where: { id },
      include: {
        transactions: true,
      },
    });
    if (!card) return res.status(404).json({ message: 'Card not found' });

    return res.json(card);
  }

  if (req.method === 'PUT') {
    const card = await prisma.card.findUnique({ where: { id } });
    if (!card) return res.status(404).json({ message: 'Card not found' });

    const updatedCard = await prisma.card.update({
      data: {
        ...card,
        ...req.body,
      },
      where: {
        id,
      },
    });

    return res.json(updatedCard);
  } else if (req.method === 'DELETE') {
    const deletedCard = await prisma.card.delete({
      where: { id },
    });

    return res.json(deletedCard);
  }
}
