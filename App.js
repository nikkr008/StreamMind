import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './src/components/common/ErrorBoundary';
import { PracticeProvider } from './src/context/Context';

const App = () => {
  return (
    <ErrorBoundary>
      <PracticeProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PracticeProvider>
    </ErrorBoundary>
  );
};

export default App;
