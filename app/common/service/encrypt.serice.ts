import * as CryptoJS from 'crypto-js';
export class EncryptSerice {
  constructor() { }
  encrypt(value: string) {
    return CryptoJS.AES.encrypt(value, process.env.SALT).toString(CryptoJS.enc.Utf8);
  }
  decrypt(value: string) {
    return CryptoJS.AES.decrypt(value, process.env.SALT).toString(CryptoJS.enc.Utf8);
  }
}