import CryptoJS from "crypto-js";
import { ENCRYPTION_CONFIG } from "../config/encryption.config";

// Parse salt and IV from Base64
const SALT = CryptoJS.enc.Base64.parse(ENCRYPTION_CONFIG.SALT);
const IV = CryptoJS.enc.Base64.parse(ENCRYPTION_CONFIG.IV_BASE64);

// Generate key using PBKDF2
const KEY = CryptoJS.PBKDF2(ENCRYPTION_CONFIG.SECRET_KEY, SALT, {
  keySize: 128 / 32, // 128 bits = 16 bytes, divided by 4 (32-bit words) = 4 words
  iterations: 65536,
  hasher: CryptoJS.algo.SHA256,
});

/**
 * Encrypt text and return object with Base64 encoded values
 */
export function encryptText(text: string) {
  const encrypted = CryptoJS.AES.encrypt(text, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  // Return Base64 encoded strings (not hex)
  return {
    encrypted: encrypted.toString(), // Already Base64 by default
    salt: ENCRYPTION_CONFIG.SALT, // Base64 encoded salt
    iv: ENCRYPTION_CONFIG.IV_BASE64, // Base64 encoded IV
  };
}

/**
 * Decrypt text from Base64 encoded cipher
 */
export function decryptText(cipher: string) {
  const bytes = CryptoJS.AES.decrypt(cipher, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return bytes.toString(CryptoJS.enc.Utf8);
}

// Export the encryption utilities
export function getEncryptionSalt() {
  return ENCRYPTION_CONFIG.SALT;
}

export function getEncryptionIV() {
  return ENCRYPTION_CONFIG.IV_BASE64;
}