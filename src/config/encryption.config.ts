// Encryption configuration
export const ENCRYPTION_CONFIG = {
  SECRET_KEY: 'fdnaefjhJHWHdafjhe',
  SALT: '0buBe0cEnoodGWwsNuq7Zg==', // Base64 encoded salt from cURL
  IV_BASE64: 'DQMjaNmmdXZC+utvF21msg==', // Base64 encoded IV from cURL
} as const;

// Validate configuration
if (!ENCRYPTION_CONFIG.SECRET_KEY) {
  throw new Error('SECRET_KEY is missing from encryption config');
}
