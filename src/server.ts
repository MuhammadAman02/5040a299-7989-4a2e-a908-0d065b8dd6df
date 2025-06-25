import Fastify from 'fastify';
import app from './app';

const start = async () => {
  const server = Fastify({ logger: true });

  try {
    await server.register(app);

    await server.listen({ port: 3000, host: '0.0.0.0' }); // important for K8s
    console.log('Server listening on http://0.0.0.0:3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
