import { z } from 'zod';

export const registerSchema = {
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    name: z.string().optional(),
  }),
  response: {
    201: z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      name: z.string().nullable(),
      token: z.string(),
    }),
  },
};

export const loginSchema = {
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  }),
  response: {
    200: z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      name: z.string().nullable(),
      token: z.string(),
    }),
  },
};

export const profileSchema = {
  response: {
    200: z.object({
      id: z.string().uuid(),
      email: z.string().email(),
      name: z.string().nullable(),
      createdAt: z.string(),
    }),
  },
};