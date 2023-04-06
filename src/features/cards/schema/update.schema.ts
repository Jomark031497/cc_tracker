import { CreateCardSchema } from './create.schema';
import { z } from 'zod';

export const UpdateCardSchema = CreateCardSchema.partial();

export type IUpdateCardInputs = z.infer<typeof UpdateCardSchema>;
