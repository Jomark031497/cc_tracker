import { CreateTransactionSchema } from './create.schema';
import { z } from 'zod';

export const UpdateTransactionSchema = CreateTransactionSchema.partial();

export type IUpdateTransactionInputs = z.infer<typeof UpdateTransactionSchema>;
