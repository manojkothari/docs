import { Injectable } from '@angular/core';
import { TypeBaseineSimulation } from '../models/global.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  //#region Logged-in User data.
  get userId(): number {
    return Number(sessionStorage.getItem('userId'));
  }
  set userId(value: number) {
    sessionStorage.setItem('userId', `${value}`);
  }

  // get userName(): string | null {
  //   return sessionStorage.getItem('userName');
  // }
  // set userName(value: string) {
  //   sessionStorage.setItem('userName', value);
  // }

  get tanentId(): number {
    return Number(sessionStorage.getItem('tanentId'));
  }
  set tanentId(value: number) {
    sessionStorage.setItem('userId', `${value}`);
  }
  get SelectedType(): TypeBaseineSimulation {
    const typeBaseineSimulation = {
      type: 1,
      typeId: 2,
      tenantId: 1,
      userEmail: 'manoj.kothari@ciplsoft.com',
      userName: 'Manoj',
      name: 'BASELINE_1',
      year: 2021,
      baseline: null,
      currency: 'USD',
      precision: 0.1,
    };
    return typeBaseineSimulation;
  }
  // set SelectedType(value: TypeBaseineSimulation) {
  //   localStorage.setItem('SelectedType', JSON.stringify(value));
  // }


  // BELOW CODE TO HAVE VALIDATION IF
  // TYPE IS BASELINE THEN TYPE ID ELSE
  // SELECTEDTYPE.BASELINE.BAESLINEID
  get baseLineId(): number {
    return this.SelectedType.typeId;
  }
  set baseLineId(value: number) {
    sessionStorage.setItem('baseLineId', `${value}`);
  }

  // BELOW CODE TO HAVE VALIDATION IF
  // TYPE IS SIMULATION THEN TYPE ID ELSE NULL
  get simulationId(): number {
    return this.SelectedType.typeId;
  }
  set simulationId(value: number) {
    sessionStorage.setItem('simulationId', `${value}`);
  }

  get totalSimulation(): number {
    return Number(sessionStorage.getItem('totalSimulation'));
  }
  set totalSimulation(value: number) {
    sessionStorage.setItem('totalSimulation', `${value}`);
  }

  get totalBaseLine(): number {
    return Number(sessionStorage.getItem('totalBaseLine'));
  }
  set totalBaseLine(value: number) {
    sessionStorage.setItem('totalBaseLine', `${value}`);
  }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(token: string): string | null {
    return localStorage.getItem(token);
  }

  removeToken(key: string): void {
    localStorage.removeItem(key);
  }
  //#endregion Logged-in User data.
}
