import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import AuthStack from './stacks/AuthStack';
import MainDrawer from './MainDrawer';
import { useAppSelector } from '../store/hooks';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';
import SCREENS from '../constants/screens';

const Stack = createStackNavigator();

export default function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.PRIMARY_COLOR} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* {true ? ( */}
        {isAuthenticated ? (
          <Stack.Screen name={SCREENS.ROOT_MAIN} component={MainDrawer} />
        ) : (
          <Stack.Screen name={SCREENS.ROOT_AUTH} component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
