import { z } from 'zod';

export const PAYMENT_NETWORKS = [
  'MASTERCARD',
  'VISA',
  'JCB',
  'AMERICAN_EXPRESS',
  'DINERS_CLUB',
] as const;

export const CreateCardSchema = z.object({
  name: z.string().min(6).max(150),
  network: z.enum(PAYMENT_NETWORKS),
  creditLimit: z.number().nonnegative(),
  date: z.date().optional(),
});

export type ICreateCardInputs = z.infer<typeof CreateCardSchema>;
