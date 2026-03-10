import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components/native';
import { Button, View, Text } from 'react-native';

import { theme } from './src/theme';
import { LoanReviewScreen } from './src/screens/LoanReviewScreen/LoanReviewScreen';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const LoginScreen = ({ onLogin }: { onLogin: () => void }) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ fontSize: 24, marginBottom: 20 }}>Underwriting Gateway</Text>
    <Button title="Login (Mock Auth)" onPress={onLogin} />
  </View>
);

export default function App() {
  const[isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
              <Stack.Screen name="Login">
                {() => <LoginScreen onLogin={() => setIsAuthenticated(true)} />}
              </Stack.Screen>
            ) : (
              <Stack.Screen name="LoanReview" component={LoanReviewScreen} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}