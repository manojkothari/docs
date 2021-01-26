import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  apiUrl = environment.champsApiUrl;
  constructor(private http: HttpClient) { }

  getPNLReportData(baselineId: number, simulationid: number, channelId: number): Observable<any> {
    const params = new HttpParams()
      .set('baselineId', `${baselineId}`)
      .set('typeId', `${simulationid}`)
      .set('channelId', `${channelId}`);
    return this.http.get<any>(`${this.apiUrl}/Report/GetProfitLoss`, { params });
  }

  getUpStream(typeBaseineSimulation: number, typeId: number, channelId: number, valueType: string): Observable<any> {
    const params = new HttpParams()
      .set('typeBaseineSimulation', `${typeBaseineSimulation}`)
      .set('typeId', `${typeId}`)
      .set('channelId', `${channelId}`)
      .set('valueType', `${valueType}`);
    return this.http.get<any>(`${this.apiUrl}/UpStream/GetUpStream`, { params });
  }

  saveUpStream(upstream: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/UpStream/Save`, upstream
    );
  }
}
