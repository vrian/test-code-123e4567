import { useQuery } from '@tanstack/react-query';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';

export const useLoanData = (loanId: string) => {
  return useQuery({
    queryKey: ['loan', loanId],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/api/v1/underwriting/${loanId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // if using ngrok
          'ngrok-skip-browser-warning': 'true', 
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Network error: ${response.status}`);
      }

      const json = await response.json();
      return json.data; 
    },
    retry: 1,
  });
};