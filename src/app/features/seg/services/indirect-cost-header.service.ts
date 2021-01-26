import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndirectCostHeaderService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.champsApiUrl;

  //#region Indirect Cost Header List.
  getIndirectCostHeaderList(typeBaseLineSimulation: number, typeId: number, headerId: number): Observable<any> {
    const params = new HttpParams()
      .set('typeBaseLineSimulation', `${typeBaseLineSimulation}`)
      .set('typeId', `${typeId}`)
      .set('headerId', `${headerId}`)
    return this.http.get<any>(`${this.apiUrl}/IndirectCostHeader/GetIndirectCostHeader`, { params });
  }

  deleteIndirectCostHeader(id: number) {
    const params = new HttpParams()
      .set('id', `${id}`)
    return this.http.delete<any>(`${this.apiUrl}/IndirectCostHeader/DeleteIndirectCostHeader`, { params });
  }

  saveIndirectCostHeader(addAssetsFormBody: object): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/IndirectCostHeader/SaveIndirectCostHeader`, addAssetsFormBody);
  }

  getIndirectCostHeaderById(id: number): Observable<any> {
    const params = new HttpParams()
      .set('id', `${id}`)
    return this.http.get<any>(`${this.apiUrl}/IndirectCostHeader/GetIndirectCostHeaderById`, { params });
  }

  updateIndirectCostHeader(editAssetsFormBody: object): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/IndirectCostHeader/UpdateIndirectCostHeader`, editAssetsFormBody);
  }
  //#endregion Indirect Cost Header .

  //#region dropdownind List.
  getDdlIndirectCostHeaderNameList(typeName: string): Observable<any> {
    const params = new HttpParams()
      .set('typeName', `${typeName}`)
    return this.http.get<any>(`${this.apiUrl}/DropDown/IndirectCostHeader`, { params });
  }
  //#region Indirect Cost Allocation List.

  getIndirectCostAllocationList(typeBaseLineSimulation: number, typeId: number, costHeaderId: number, costId: number, allocationMethod: string): Observable<any> {
    const params = new HttpParams()
      .set('typeBaseLineSimulation', `${typeBaseLineSimulation}`)
      .set('typeId', `${typeId}`)
      .set('costHeaderId', `${costHeaderId}`)
      .set('costId', `${costId}`)
      .set('allocationMethod', `${allocationMethod}`);
    return this.http.get<any>(`${this.apiUrl}/IndirectCostAllocation/GetIndirectCostAllocation`, { params });
  }

  //#region dropdownind List for Indirect Cost Allocation.
  getDdlCostIndirectAllocationHeaderNameList(typeName: string): Observable<any> {
    const params = new HttpParams()
      .set('typeName', `${typeName}`)
    return this.http.get<any>(`${this.apiUrl}/DropDown/IndirectCostHeader`, { params });
  }

  getDdlCostList(typeName: string): Observable<any> {
    const params = new HttpParams()
      .set('typeName', `${typeName}`)
    return this.http.get<any>(`${this.apiUrl}/DropDown/IndirectCostHeader`, { params });
  }

  getDdlAllocationMethodList(typeName: string): Observable<any> {
    const params = new HttpParams()
      .set('typeName', `${typeName}`)
    return this.http.get<any>(`${this.apiUrl}/DropDown/IndirectCostHeader`, { params });
  }
  //#Endregion Indirect Cost Allocation List.
}

