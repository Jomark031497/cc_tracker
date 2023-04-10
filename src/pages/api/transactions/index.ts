import { CreateTransactionSchema } from '@/features/transactions';
import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  if (req.method === 'GET') {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: session.user.id,
      },
    });

    return res.json(transactions);
  } else if (req.method === 'POST') {
    const data = CreateTransactionSchema.parse(req.body);

    const transaction = await prisma.transaction.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    // Decrement the credit limit
    await prisma.card.update({
      where: { id: data.cardId },
      data: {
        creditLimit: {
          decrement: data.amount,
        },
        oustandingBalance: {
          increment: data.amount,
        },
      },
    });

    return res.json(transaction);
  }
}
