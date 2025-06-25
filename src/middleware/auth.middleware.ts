import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../utils/AppError';

export async function authMiddleware(req: FastifyRequest, res: FastifyReply) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Authorization token required', 401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    
    // Add user info to request object
    (req as any).user = decoded;
  } catch (error: any) {
    if (error.message === 'Invalid token') {
      throw new AppError('Invalid or expired token', 401);
    }
    throw error;
  }
}