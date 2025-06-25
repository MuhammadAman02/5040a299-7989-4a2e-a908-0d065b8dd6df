import { FastifyRequest, FastifyReply } from 'fastify';
import { registerUser, loginUser, getUserProfile } from '../services/auth.service';
import { AppError } from '../utils/AppError';

export async function registerHandler(
  req: FastifyRequest<{ Body: { email: string; password: string; name?: string } }>,
  res: FastifyReply
) {
  try {
    const user = await registerUser(req.body);
    res.status(201).send(user);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    console.error('Registration error:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

export async function loginHandler(
  req: FastifyRequest<{ Body: { email: string; password: string } }>,
  res: FastifyReply
) {
  try {
    const user = await loginUser(req.body);
    res.status(200).send(user);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    console.error('Login error:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}

export async function profileHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const userId = (req as any).user.userId;
    const user = await getUserProfile(userId);
    res.status(200).send(user);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    console.error('Profile error:', error);
    return res.status(500).send({ error: 'Internal server error' });
  }
}