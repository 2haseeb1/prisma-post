import { z } from 'zod';

export const createServiceSchema = z.object({
  bikeId: z.string().uuid(),
  serviceDate: z.string().datetime(),
  description: z.string(),
  status: z.enum(['pending', 'in_progress', 'done']),
});

export const updateServiceSchema = z.object({
  bikeId: z.string().uuid().optional(),
  serviceDate: z.string().datetime().optional(),
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'done']).optional(),
});

export const completeServiceSchema = z.object({
  completionDate: z.string().datetime(),
});