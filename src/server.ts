import app from './app';
import { env } from './config/env';

const start = async () => {
  try {
    await app.listen({
      port: env.PORT,
      host: '0.0.0.0',
    });
    
    console.log(`🚀 Server running on http://localhost:${env.PORT}`);
    console.log(`📚 API endpoints:`);
    console.log(`   POST /api/auth/register - User registration`);
    console.log(`   POST /api/auth/login - User login`);
    console.log(`   GET  /api/auth/profile - Get user profile (protected)`);
    console.log(`   GET  /api/health - Health check`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();