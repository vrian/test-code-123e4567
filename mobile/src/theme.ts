export const theme = {
  colors: {
    background: '#F7F9FC',
    surface: '#FFFFFF',
    primary: '#0052FF',
    text: '#0A0B0D',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    danger: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
  },
  spacing: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    md: '8px',
    lg: '12px',
  }
};

export type Theme = typeof theme;