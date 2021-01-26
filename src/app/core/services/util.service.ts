import { Injectable } from '@angular/core';
// import { AES, enc } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  // encrypt(data: string, secretKey: string): string {
  //   return AES.encrypt(data, secretKey).toString();
  // }

  // decrypt(data: string, secretKey: string): string {
  //   return AES.decrypt(data, secretKey).toString(enc.Utf8);
  // }

  randomNumber(digit: number): any {
    return Math.floor(Math.random() * (999999 - 100000)) + 100000;
  }

}
