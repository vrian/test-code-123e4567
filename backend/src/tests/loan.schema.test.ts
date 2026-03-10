import { TransformedLoanSchema } from '../schemas/loan.schema';

describe('Data Transformation Layer: Loan Schema', () => {
  it('should successfully transform valid legacy data to sanitized JSON', () => {
    const rawData = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      amountCents: 250075, // $2500.75
      legacyDate: '2023-10-05 14:00:00',
      timezone: 'America/New_York',
      customerName: 'Jane Smith',
    };

    const result = TransformedLoanSchema.parse(rawData);

    expect(result.financials.amount).toBe(2500.75);
    expect(result.financials.formattedAmount).toBe('$2500.75');
    expect(result.financials.currency).toBe('USD');
    
    // New York UTC-4 in October (EDT). 14:00 EDT -> 18:00 UTC
    expect(result.timestamps.createdAtUTC).toBe('2023-10-05T18:00:00.000Z');
  });

  it('should throw a validation error for corrupted data (negative cents)', () => {
    const corruptedData = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      amountCents: -100,
      legacyDate: '2023-10-05 14:00:00',
      timezone: 'America/New_York',
      customerName: 'Jane Smith',
    };

    expect(() => TransformedLoanSchema.parse(corruptedData)).toThrow();
  });

  it('should throw a validation error for invalid timezone', () => {
    const invalidTimezoneData = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      amountCents: 1000,
      legacyDate: '2023-10-05 14:00:00',
      timezone: 'Fake/Timezone',
      customerName: 'Jane Smith',
    };

    expect(() => TransformedLoanSchema.parse(invalidTimezoneData)).toThrow('Invalid legacy date or timezone');
  });
});