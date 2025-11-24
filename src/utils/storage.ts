import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_SERVICE = 'com.demo.app.token';
const FALLBACK_TOKEN_KEY = 'app_plain_token';
const USER_ID_KEY = 'USER_ID';
const isKeychainAvailable = typeof Keychain?.setGenericPassword === 'function';

export const storage = {
  async saveToken(token: string) {
    try {
      if (isKeychainAvailable) {
        await Keychain.setGenericPassword('authToken', token, {
          service: TOKEN_SERVICE,
        });
      } else {
        await AsyncStorage.setItem(FALLBACK_TOKEN_KEY, token);
        console.warn('Keychain unavailable, fallback to AsyncStorage');
      }
    } catch (e) {
      console.warn('Failed to save token securely', e);
    }
  },
  async loadToken(): Promise<string | null> {
    try {
      if (isKeychainAvailable) {
        const credentials = await Keychain.getGenericPassword({
          service: TOKEN_SERVICE,
        });
        if (!credentials) {
          return null;
        }
        return credentials.password || null;
      }
      return (await AsyncStorage.getItem(FALLBACK_TOKEN_KEY)) || null;
    } catch (e) {
      console.warn('Failed to load token securely', e);
      return null;
    }
  },
  async clearToken() {
    try {
      if (isKeychainAvailable) {
        await Keychain.resetGenericPassword({
          service: TOKEN_SERVICE,
        });
      } else {
        await AsyncStorage.removeItem(FALLBACK_TOKEN_KEY);
      }
    } catch (e) {
      console.warn('Failed to clear token securely', e);
    }
  },
  async saveUserId(userId: string) {
    try {
      await AsyncStorage.setItem(USER_ID_KEY, userId);
    } catch (e) {
      console.warn('Failed to save USER_ID', e);
    }
  },
  async loadUserId(): Promise<string | null> {
    try {
      return (await AsyncStorage.getItem(USER_ID_KEY)) || null;
    } catch (e) {
      console.warn('Failed to load USER_ID', e);
      return null;
    }
  },
  async clearUserId() {
    try {
      await AsyncStorage.removeItem(USER_ID_KEY);
    } catch (e) {
      console.warn('Failed to clear USER_ID', e);
    }
  },
};
