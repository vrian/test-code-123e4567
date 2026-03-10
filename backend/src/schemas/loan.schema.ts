import { z } from 'zod';
import { DateTime } from 'luxon';

export const AiRiskProfileSchema = z.object({
  riskScore: z.number().min(0).max(100),
  riskLevel: z.enum(['Low', 'Moderate', 'High', 'Critical']),
  reasons: z.array(
    z.object({
      id: z.string(),
      title: z.string(),       
      description: z.string(),
    })
  ).max(3), 
});

export const LegacyLoanSchema = z.object({
  id: z.string().uuid(),
  amountCents: z.number().int().nonnegative(),
  legacyDate: z.string(), // e.g., "2023-10-05 14:00:00"
  timezone: z.string(),   // e.g., "America/New_York"
  customerName: z.string().min(1),
});

export const TransformedLoanSchema = LegacyLoanSchema.transform((data, ctx) => {
  
  const amountDecimal = data.amountCents / 100;
  // Parse using (timezone) and convert to UTC ISO
  const parsedDate = DateTime.fromFormat(data.legacyDate, 'yyyy-MM-dd HH:mm:ss', {
    zone: data.timezone,
  });

  if (!parsedDate.isValid) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Invalid legacy date or timezone: ${parsedDate.invalidReason}`,
      path: ['legacyDate'],
    });
    return z.NEVER;
  }
  

  return {
    loanId: data.id,
    customerName: data.customerName,
    financials: {
      amount: amountDecimal,
      currency: 'USD',
      formattedAmount: `$${amountDecimal.toFixed(2)}`,
    },
    timestamps: {
      createdAtUTC: parsedDate.toUTC().toISO(),
    },
    riskAnalysis: {
      // example only: simplified risk rule
      score: amountDecimal > 5000 ? 'HIGH' : 'LOW'
    }
  };
});

export type TransformedLoan = z.infer<typeof TransformedLoanSchema>;
export type AiRiskProfile = z.infer<typeof AiRiskProfileSchema>;

export interface FullLoanReviewPayload {
  loanDetails: TransformedLoan;
  riskProfile: AiRiskProfile;
}