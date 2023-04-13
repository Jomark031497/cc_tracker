import { CreateCardSchema } from '@/features/cards';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'GET') {
    const cards = await prisma.card.findMany({
      where: { userId: session.user.id },
      orderBy: {
        oustandingBalance: 'desc',
      },
    });

    return res.json(cards);
  } else if (req.method === 'POST') {
    const data = CreateCardSchema.parse(req.body);
    if (!data) return res.status(400).json(data);

    const card = await prisma.card.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return res.json(card);
  }
}
