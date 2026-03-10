import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import underwritingRoutes from './routes/underwriting.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/v1/underwriting', underwritingRoutes);

app.use(errorHandler);

export default app;