import { Card, Transaction } from '@prisma/client';

export type ITransactionWithCard = {
  card: Card;
} & Transaction;
