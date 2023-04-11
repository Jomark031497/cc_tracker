import { Card, Transaction } from '@prisma/client';

export type CardWithTransactions = {
  transactions: Transaction[];
} & Card;
