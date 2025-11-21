// simple AsyncStorage helpers for token persistence
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'app_token_v1';

export const storage = {
  async saveToken(token: string) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.warn('Failed to save token', e);
    }
  },
  async loadToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) {
      console.warn('Failed to load token', e);
      return null;
    }
  },
  async clearToken() {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.warn('Failed to clear token', e);
    }
  },
};
