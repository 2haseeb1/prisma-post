import { z } from 'zod';

// Define the schema for the bike data directly
export const createBikeSchema = z.object({
  brand: z.string().min(1, 'Brand is required'),
  model: z.string().min(1, 'Model is required'),
  year: z.number().int().min(1900, 'Year must be after 1900'),
  customerId: z.string().uuid('Invalid customer ID format'),
});