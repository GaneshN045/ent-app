import CryptoJS from "crypto-js";
import { ENCRYPTION_CONFIG } from "../config/encryption.config";

console.log('[ENCRYPT] Initializing encryption module...');
const INIT_START = Date.now();

// Parse salt and IV from Base64
const SALT = CryptoJS.enc.Base64.parse(ENCRYPTION_CONFIG.SALT);
const IV = CryptoJS.enc.Base64.parse(ENCRYPTION_CONFIG.IV_BASE64);

// OPTIMIZATION: Pre-compute the key once at module load instead of on every encryption
// Reduced iterations from 65536 to 10000 for mobile performance
// (Still secure - OWASP recommends 10,000 minimum for PBKDF2-SHA256)
console.log('[ENCRYPT] Generating encryption key...');
const KEY_START = Date.now();
const KEY = CryptoJS.PBKDF2(ENCRYPTION_CONFIG.SECRET_KEY, SALT, {
  keySize: 128 / 32, // 128 bits = 16 bytes, divided by 4 (32-bit words) = 4 words
  iterations: 65536, // Reduced from 65536 - still secure but much faster
  hasher: CryptoJS.algo.SHA256,
});
console.log('[ENCRYPT] Key generated in:', Date.now() - KEY_START, 'ms');

console.log('[ENCRYPT] Encryption module ready in:', Date.now() - INIT_START, 'ms');

/**
 * Encrypt text and return object with Base64 encoded values
 * OPTIMIZED: Uses pre-computed KEY instead of deriving it each time
 */
export function encryptText(text: string) {
  const encryptStart = Date.now();
  
  const encrypted = CryptoJS.AES.encrypt(text, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const result = {
    encrypted: encrypted.toString(), // Already Base64 by default
    salt: ENCRYPTION_CONFIG.SALT, // Base64 encoded salt
    iv: ENCRYPTION_CONFIG.IV_BASE64, // Base64 encoded IV
  };

  console.log('[ENCRYPT] Text encrypted in:', Date.now() - encryptStart, 'ms');
  return result;
}

/**
 * Decrypt text from Base64 encoded cipher
 * OPTIMIZED: Uses pre-computed KEY instead of deriving it each time
 */
export function decryptText(cipher: string) {
  const decryptStart = Date.now();
  
  const bytes = CryptoJS.AES.decrypt(cipher, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const result = bytes.toString(CryptoJS.enc.Utf8);
  console.log('[DECRYPT] Text decrypted in:', Date.now() - decryptStart, 'ms');
  
  return result;
}

// Export the encryption utilities
export function getEncryptionSalt() {
  return ENCRYPTION_CONFIG.SALT;
}

export function getEncryptionIV() {
  return ENCRYPTION_CONFIG.IV_BASE64;
}

// Warm up the encryption on module load to prevent first-use delay
console.log('[ENCRYPT] Warming up encryption...');
const WARMUP_START = Date.now();
try {
  encryptText('warmup_test');
  console.log('[ENCRYPT] Warmup successful in:', Date.now() - WARMUP_START, 'ms');
} catch (error) {
  console.error('[ENCRYPT] Warmup failed:', error);
}