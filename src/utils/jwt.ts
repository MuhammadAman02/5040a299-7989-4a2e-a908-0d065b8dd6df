import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export function generateToken(payload: { userId: string; email: string }): string {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string; email: string } {
  try {
    return jwt.verify(token, env.JWT_SECRET) as { userId: string; email: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
}