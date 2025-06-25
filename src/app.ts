import Fastify from 'fastify';
import { authRoutes } from './routes/auth.route';

const app = Fastify({
  logger: true,
});

// Register routes
app.register(authRoutes);

// Global error handler
app.setErrorHandler(async (error, request, reply) => {
  app.log.error(error);
  
  if (error.validation) {
    return reply.status(400).send({
      error: 'Validation failed',
      details: error.validation,
    });
  }

  return reply.status(500).send({
    error: 'Internal Server Error',
  });
});

// Health check endpoint
app.get('/api/health', async (request, reply) => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

export default app;