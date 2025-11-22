import 'react-native-get-random-values'; // MUST be first
import './global.css';
import React from 'react';
import { StatusBar, Text, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import RootNavigator from './src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth as useAuthHook } from './src/hooks/useAuth';

function BootstrapApp() {
  const { hydrate } = useAuthHook();

  React.useEffect(() => {
    hydrate(() => {});
  }, [hydrate]);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />
      <RootNavigator />
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}> 
        <BootstrapApp />
      </Provider>
    </GestureHandlerRootView>
  );
}
