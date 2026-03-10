import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: any) => props.theme.colors.background};
`;

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: { padding: 16 },
})``;

export const HeaderCard = styled.View`
  background-color: ${(props: any) => props.theme.colors.surface};
  padding: ${(props: any) => props.theme.spacing.lg};
  border-radius: ${(props: any) => props.theme.borderRadius.lg};
  align-items: center;
  margin-bottom: ${(props: any) => props.theme.spacing.lg};
  border: 1px solid ${(props: any) => props.theme.colors.border};
`;

export const CustomerName = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${(props: any) => props.theme.colors.text};
`;

export const LoanAmount = styled.Text`
  font-size: 32px;
  font-weight: 800;
  color: ${(props: any) => props.theme.colors.primary};
  margin: ${(props: any) => props.theme.spacing.sm} 0;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: ${(props: any) => props.theme.colors.textSecondary};
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${(props: any) => props.theme.colors.text};
  margin-bottom: ${(props: any) => props.theme.spacing.md};
`;

export const Center = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ErrorText = styled.Text`
  color: ${(props: any) => props.theme.colors.danger};
  font-size: 16px;
  text-align: center;
  margin-top: ${(props: any) => props.theme.spacing.md};
`;