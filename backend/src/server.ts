import app from './app';
import dotenv from 'dotenv';
import pino from 'pino';

dotenv.config();

const logger = pino(
    process.env.NODE_ENV !== 'production' ? { transport: { target: 'pino-pretty' } } : {}
);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Underwriting Gateway is running on http://localhost:${PORT}`);
});


process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});