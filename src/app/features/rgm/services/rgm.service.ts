import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RgmService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.champsApiUrl;

  //#region Rgm category.
  getCategoryList(baseLineId: number): Observable<any> {
    const params = new HttpParams()
      .set('baseLineId', `${baseLineId}`);
    return this.http.get<any>(`${this.apiUrl}/Category/GetCategoryList`, { params });
  }

  deleteBrandCategory(brandId: number): Observable<any> {
    const params = new HttpParams()
      .set('brandId', `${brandId}`);
    return this.http.delete(`${this.apiUrl}/Category/DeleteCategory`, { params });
  }

  getBrandCategoryById(brandId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Category/GetCategoryById/${brandId}`);
  }

  checkCategoryNameIsAvailable(baseLineId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Category/validateCategoryName/${baseLineId}`);
  }

  saveCategory(addCategoryFormBody: object): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Category/SaveCategory`, addCategoryFormBody);
  }

  updateCategory(editCategoryFormBody: object): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/Category/UpdateCategory`, editCategoryFormBody);
  }
  //#endregion Rgm category.

  //#region Rgm Channel.
  getChannelList(baseLineId: number, channelId: number, channelAbbr: string): Observable<any> {
    const params = new HttpParams()
      .set('baseLineId', `${baseLineId}`)
      .set('channelId', `${channelId}`)
      .set('channelAbbr', `${channelAbbr}`)
    return this.http.get<any>(`${this.apiUrl}/Channel/GetChannelList`, { params });
  }

  deleteChannel(channelId: number, userId: string): Observable<any> {
    const params = new HttpParams()
      .set('channelId', `${channelId}`)
      .set('userId', `${userId}`)
    return this.http.delete<any>(`${this.apiUrl}/Channel/DeleteChannel`, { params });
  }

  saveChannel(addChannelFormBody: object): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Channel/SaveChannel`, addChannelFormBody);
  }

  getChannelById(channelId: number): Observable<any> {
    const params = new HttpParams()
      .set('channelId', `${channelId}`);
    return this.http.get<any>(`${this.apiUrl}/Channel/GetChannelById`, { params });
  }

  updateChannel(updateChannelFromModel: object): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/Channel/UpdateChannel`, updateChannelFromModel);
  }

  getDdlChannelIsscom(isscomType: string): Observable<any> {
    const params = new HttpParams()
      .set('isscomType', `${isscomType}`)
    return this.http.get<any>(`${this.apiUrl}/DropDown/Isscom`, { params });
  }
  //#endregion Rgm Channel.

  //#region Rgm Outlets by channel.
  getOutletListByChannel(
    baseLineTypeOrSimulationType: number,
    typeId: number, channelId: number): Observable<any> {
    const params = new HttpParams()
      .set('baseLineTypeOrSimulationType', `${baseLineTypeOrSimulationType}`)
      .set('typeId', `${typeId}`)
      .set('channelId', `${channelId}`);
    return this.http.get<any>(`${this.apiUrl}/Rgm/getOutletListByChannel`, { params });
  }

  saveOutletByChannel(saveOutletRowItems: object[]): Observable<any> {
    return this.http.post<boolean>(`${this.apiUrl}/Rgm/SaveOutletByChannel`, saveOutletRowItems);
  }

  deleteOutletByChannel(channelId: number): Observable<any> {
    const params = new HttpParams()
      .set('channelId', `${channelId}`);
    return this.http.delete(`${this.apiUrl}/Rgm/DeleteOutletByChannel`, { params });
  }
  //#endregion Rgm Outlets by channel.

  //#region Rgm Package.
  
  //#region Rgm Package.
  GetPackList(baseLineId: number, packId: number): Observable<any> {
    const params = new HttpParams()
      .set('baseLineId', `${baseLineId}`)
      .set('packId', `${packId}`);
    return this.http.get<any>(`${this.apiUrl}/Pack/GetPack`, { params });
  }

  savePack(addPackageFromModel: object): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/Pack/SavePack`, addPackageFromModel);
  }

  getPackDetailsById(baseLineId: number, packId: number): Observable<any> {
    const params = new HttpParams()
      .set('baseLineId', `${baseLineId}`)
      .set('packId', `${packId}`);
    return this.http.get<any>(`${this.apiUrl}/Pack/GetPack`, { params });
  }

  deletePack(packId: number, userId: string): Observable<any> {
    const params = new HttpParams()
      .set('packId', `${packId}`)
      .set('userId', `${userId}`);
    return this.http.delete<any>(`${this.apiUrl}/Pack/DeletePack`, { params });
  }
  //#endregion Rgm Package.
  //#endregion Rgm Package.


  getUpStream(typeBaseineSimulation: number, typeId: number, channelId: number, valueType: string): Observable<any>
  {
    const params = new HttpParams()
      .set('typeBaseineSimulation', `${typeBaseineSimulation}`)
      .set('typeId', `${typeId}`)
      .set('channelId', `${channelId}`)
      .set('valueType', `${valueType}`)
    return this.http.get<any>(`${this.apiUrl}/UpStream/GetUpStream`, { params });
  }

  saveUpStream(upstream: any): Observable<any> {
    console.log(upstream);
    return this.http.post(`${this.apiUrl}/UpStream/Save`, upstream);
  }
}
