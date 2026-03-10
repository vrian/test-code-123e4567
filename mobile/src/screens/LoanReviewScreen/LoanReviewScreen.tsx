import React from 'react';
import { ActivityIndicator } from 'react-native';
import { DateTime } from 'luxon';
import { useLoanData } from '../../api/useLoanData';
import { Accordion } from '../../components/ui/Accordion/Accordion';
import { AlertTriangle } from 'lucide-react-native';
import * as s from './LoanReviewScreen.styles';
import { theme } from '../../theme';

export const LoanReviewScreen = () => {
  // sample id
  const { data, isLoading, isError, error } = useLoanData('123e4567-e89b-12d3-a456-426614174000');

  if (isLoading) {
    return (
      <s.Center>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </s.Center>
    );
  }

  if (isError) {
    return (
      <s.Center>
        <AlertTriangle color={theme.colors.danger} size={48} />
        <s.ErrorText>{error?.message || 'Failed to load loan data'}</s.ErrorText>
      </s.Center>
    );
  }

  const rawDate = data?.loanDetails?.timestamps?.createdAtUTC;
  
  const formattedDate = rawDate 
    ? DateTime.fromISO(rawDate).toLocaleString(DateTime.DATETIME_MED)
    : 'Date unavailable';

  return (
    <s.SafeArea>
      <s.ScrollContainer>
        
        <s.HeaderCard>
          <s.CustomerName>{data.loanDetails.customerName}</s.CustomerName>
          <s.LoanAmount>{data.loanDetails.financials.formattedAmount}</s.LoanAmount>
          <s.DateText>Applied: {formattedDate}</s.DateText>
          <s.DateText>Risk Score: {data.riskProfile.riskScore} / 100</s.DateText>
        </s.HeaderCard>

        <s.SectionTitle>Risk Factors ({data.riskProfile.riskLevel})</s.SectionTitle>
        
        {data.riskProfile.reasons.map((reason: any) => (
          <Accordion 
            key={reason.id} 
            title={reason.title} 
            description={reason.description} 
          />
        ))}

      </s.ScrollContainer>
    </s.SafeArea>
  );
};