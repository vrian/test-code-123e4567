import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: ${(props: any) => props.theme.colors.surface};
  border-radius: ${(props: any) => props.theme.borderRadius.md};
  margin-bottom: ${(props: any) => props.theme.spacing.sm};
  border: 1px solid ${(props: any) => props.theme.colors.border};
  overflow: hidden;
`;

export const Header = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${(props: any) => props.theme.spacing.md};
`;

export const Title = styled.Text`
  flex: 1;
  font-size: 16px;
  font-weight: 600;
  color: ${(props: any) => props.theme.colors.text};
  margin-left: ${(props: any) => props.theme.spacing.sm};
`;

export const Content = styled.View`
  padding: 0 ${(props: any) => props.theme.spacing.md} ${(props: any) => props.theme.spacing.md};
`;

export const Description = styled.Text`
  font-size: 14px;
  line-height: 20px;
  color: ${(props: any) => props.theme.colors.textSecondary};
`;