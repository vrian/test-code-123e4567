import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';
import pino from 'pino';

const logger = pino(
  process.env.NODE_ENV !== 'production' ? { transport: { target: 'pino-pretty' } } : {}
);

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // corrupted legacy data
  if (err instanceof ZodError) {
    logger.warn({ err }, 'Data validation failed');
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: 'error',
      message: 'Invalid data format',
      details: err.issues,
    });
  }

  // timeout
  if (err instanceof AppError) {
    logger.error({ err }, 'Operational Error');
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // other unhandled
  logger.fatal({ err }, 'Unhandled server error');
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};