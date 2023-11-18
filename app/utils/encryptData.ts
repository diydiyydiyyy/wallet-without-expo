import CryptoJS from 'react-native-crypto-js';

export async function encryptData(value: string, secret: string) {
  const encrypted = CryptoJS.AES.encrypt(value, secret).toString();
  return encrypted;
}
