import { TransformedLoanSchema, FullLoanReviewPayload, AiRiskProfileSchema } from '../schemas/loan.schema';
import { AppError } from '../utils/AppError';
import { StatusCodes } from 'http-status-codes';


export class UnderwritingService {
  public async getLoanData(loanId: string): Promise<FullLoanReviewPayload> {
    // legacy DB call
    const rawLegacyData = await this.mockLegacyDbFetch(loanId);
    const loanDetails = TransformedLoanSchema.parse(rawLegacyData);

    //AI or 3rd party Risk Analysis
    const rawAiData = await this.mockAiServiceFetch(loanId);
    const riskProfile = AiRiskProfileSchema.parse(rawAiData);

    return {
      loanDetails,
      riskProfile,
    };
  }

  private async mockLegacyDbFetch(loanId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // DB Timeout example: id that triggers timeout
        if (loanId === 'timeout-id') {
          return reject(new AppError(StatusCodes.GATEWAY_TIMEOUT, 'Legacy database timeout'));
        }

        // corrupted data: somehow became negative
        if (loanId === 'corrupt-id') {
          return resolve({ id: loanId, amountCents: -500 }); 
        }
        //not tackled due to time constraints:
        //null data, use of single quotes (custom json parsing), duplicated fields, truncated data

        resolve({
          id: loanId === 'ai-down-id' ? '123e4567-e89b-12d3-a456-426614174000' : loanId,
          amountCents: 150050,
          legacyDate: '2023-10-05 14:00:00',
          timezone: 'America/New_York',
          customerName: 'John Doe',
        });
      }, 100);
    });
  }

  private async mockAiServiceFetch(loanId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // AI Service down
        if (loanId === 'ai-down-id') {
          return reject(new AppError(StatusCodes.BAD_GATEWAY, 'AI Risk Engine is currently unavailable'));
        }

        resolve({
          riskScore: 72,
          riskLevel: 'Moderate',
          reasons:[
            {
              id: 'r1',
              title: 'High Debt-to-Income Ratio',
              description: 'Applicant\'s DTI is 45%, exceeding the standard threshold of 36%. This indicates potential difficulty in managing additional monthly payments.'
            },
            {
              id: 'r2',
              title: 'Recent Late Payments',
              description: 'Two payments were marked 30+ days late on existing credit lines within the last 6 months.'
            },
            {
              id: 'r3',
              title: 'No Employment History',
              description: 'Applicant has no recorded employment history. We prefer a minimum of 6 months of stable employment.'
            }
          ]
        });
      }, 150);
    });
  }
}

