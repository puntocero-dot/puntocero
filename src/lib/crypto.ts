import CryptoJS from "crypto-js";

const ENCRYPTION_KEY =
  process.env.CREDENTIALS_ENCRYPTION_KEY ?? "default-dev-key-change-me!!";

export function encrypt(plaintext: string): string {
  return CryptoJS.AES.encrypt(plaintext, ENCRYPTION_KEY).toString();
}

export function decrypt(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}
