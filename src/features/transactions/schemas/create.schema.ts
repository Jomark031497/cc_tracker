import { z } from 'zod';

export const CreateTransactionSchema = z.object({
  name: z.string().min(1).max(255),
  amount: z.number().nonnegative(),
  date: z.date().optional(),
  imageUrl: z.string().url().optional(),
  cardId: z.string().cuid(),
});

export type ICreateTransactionInputs = z.infer<typeof CreateTransactionSchema>;
