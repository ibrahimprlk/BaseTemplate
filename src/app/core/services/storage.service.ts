import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setLocalStorage(key: string, value: string) {
    let encryptedKey = this.encrypt(key);
    let encryptedValue = this.encrypt(value);
    localStorage.setItem(encryptedKey, encryptedValue);
  }
  getLocalStorage(key: string) {
    let encryptedKey = this.encrypt(key);
    let encryptedValue = localStorage.getItem(encryptedKey);
    return this.decrypt(encryptedValue ?? '');
  }
  deleteLocalStorage(key: string) {
    let encryptedKey = this.encrypt(key);
    localStorage.removeItem(encryptedKey);
  }
  clearLocalStorage() {
    localStorage.clear();
  }
  setSessionStorage(key: string, value: string) {
    let encryptedKey = this.encrypt(key);
    let encryptedValue = this.encrypt(value);
    sessionStorage.setItem(encryptedKey, encryptedValue);
  }
  getSessionStorage(key: string) {
    let encryptedKey = this.encrypt(key);
    let encryptedValue = sessionStorage.getItem(encryptedKey);
    return this.decrypt(encryptedValue ?? '');
  }
  deleteSessionStorage(key: string) {
    let encryptedKey = this.encrypt(key);
    sessionStorage.removeItem(encryptedKey);
  }
  clearSessionStorage() {
    sessionStorage.clear();
  }

  private encrypt(parameter: string) {
    let assciCodes: number[] = [];

    for (let i = 0; i < parameter.length; i++) {
      assciCodes.push(parameter[i].charCodeAt(0) + 1);
    }

    let result: string = '';
    for (let i = 0; i < assciCodes.length; i++) {
      result += String.fromCharCode(assciCodes[i]);
    }

    return window.btoa(result);
  }

  private decrypt(parameter: string): string | undefined {
    if (!parameter) return undefined;

    let _str = window.atob(parameter);

    let assciCodes: number[] = [];
    for (let i = 0; i < _str.length; i++) {
      assciCodes.push(_str[i].charCodeAt(0) - 1);
    }

    let result: string = '';
    for (let i = 0; i < assciCodes.length; i++) {
      result += String.fromCharCode(assciCodes[i]);
    }

    return result;
  }
}
