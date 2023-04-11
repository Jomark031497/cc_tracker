import { getServerAuthSession } from '@/server/auth';
import { prisma } from '@/server/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerAuthSession({ req, res });
  if (!session) return res.status(401).json({ message: 'Unauthorized' });

  const id = req.query.id as string;

  if (req.method === 'GET') {
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    return res.json(transaction);
  } else if (req.method === 'DELETE') {
    // Find the transaction
    // Add the amount of transaction in the cl of the card
    // delete from database
  } else if (req.method === 'PUT') {
    // Find the transaction
    // revert the amount of the transaction in card
    // decrement
  }
}
