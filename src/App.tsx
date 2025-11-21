import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { ActivityIndicator, View } from 'react-native';
import { store } from './app/store';
import AppNavigator from './navigation/AppNavigator';
import { useAuth as useAuthHook } from './hooks/useAuth';
import { AuthGuard } from './navigation/AuthGuard';

function BootstrapApp() {
  const { hydrate } = useAuthHook();
  const [hydrated, setHydrated] = React.useState(false);

  useEffect(() => {
    (async () => {
      await hydrate(() => {});
      setHydrated(true);
    })();
  }, [hydrate]);

  if (!hydrated) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <AuthGuard>
      <AppNavigator />
    </AuthGuard>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BootstrapApp />
    </Provider>
  );
}
