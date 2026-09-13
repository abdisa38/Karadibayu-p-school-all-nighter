import { z } from 'zod';

export const loginSchema = {
  body: z.object({
    email: z
      .string({ required_error: 'Institutional email is required' })
      .email('Please provide a valid institutional email address'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, 'Password must be at least 6 characters long'),
  }),
};

export const forgotPasswordSchema = {
  body: z.object({
    email: z
      .string({ required_error: 'Institutional email is required' })
      .email('Please provide a valid institutional email address'),
  }),
};
