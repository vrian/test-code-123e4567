import { Request, Response, NextFunction } from 'express';
import { UnderwritingService } from '../services/underwriting.service';
import { StatusCodes } from 'http-status-codes';

export class UnderwritingController {
  constructor(private underwritingService: UnderwritingService) {}

  public getLoanDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const loanData = await this.underwritingService.getLoanData(id as string);
      
      res.status(StatusCodes.OK).json({
        status: 'success',
        data: loanData,
      });
    } catch (error) {
      next(error); 
    }
  };
}