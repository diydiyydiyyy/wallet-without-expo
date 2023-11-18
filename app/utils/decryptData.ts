import CryptoJS from 'react-native-crypto-js';

export function decryptData(value: string, secret: string) {
  const dencrypted = CryptoJS.AES.decrypt(value, secret).toString(
    CryptoJS.enc.Utf8,
  );
  return dencrypted;
}
