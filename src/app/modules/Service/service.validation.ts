import { z } from 'zod';

export const createServiceSchema = z.object({
  bikeId: z.string().uuid('Invalid bike ID format'),
  serviceDate: z.string().datetime('Invalid date format'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'DONE'], {
    errorMap: () => ({ message: 'Status must be one of: PENDING, IN_PROGRESS, DONE' }),
  }),
});

export const completeServiceSchema = z.object({
  completionDate: z.string().datetime('Invalid date format'),
});