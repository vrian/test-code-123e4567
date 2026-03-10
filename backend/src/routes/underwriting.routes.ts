import { Router } from 'express';
import { UnderwritingController } from '../controllers/underwriting.controller';
import { UnderwritingService } from '../services/underwriting.service';

const router = Router();

const underwritingService = new UnderwritingService();
const underwritingController = new UnderwritingController(underwritingService);

router.get('/:id', underwritingController.getLoanDetails.bind(underwritingController));

export default router;