import { FastifyInstance } from 'fastify';
import { registerHandler, loginHandler, profileHandler } from '../controllers/auth.controller';
import { registerSchema, loginSchema, profileSchema } from '../schemas/auth.schema';
import { authMiddleware } from '../middleware/auth.middleware';

export async function authRoutes(app: FastifyInstance) {
  // Public routes
  app.post('/api/auth/register', {
    schema: registerSchema,
    handler: registerHandler,
  });

  app.post('/api/auth/login', {
    schema: loginSchema,
    handler: loginHandler,
  });

  // Protected route
  app.get('/api/auth/profile', {
    schema: profileSchema,
    preHandler: authMiddleware,
    handler: profileHandler,
  });
}