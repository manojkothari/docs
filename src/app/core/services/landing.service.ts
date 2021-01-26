import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.champsApiUrl;

  getSimulationCount(userId: number, tenantId: number, baseLineId: number, simulationId: number): Observable<any> {
    const params = new HttpParams()
      .set('userId', `${userId}`)
      .set('tenantId', `${tenantId}`)
      .set('baseLineId', `${baseLineId}`)
      .set('simulationId', `${simulationId}`);
    return this.http.get<any>(`${this.apiUrl}/Simulation/GetSimulationCount`, { params });
  }

  getBaseLineCount(userId: number, tenantId: number, baseLineId: number): Observable<any> {
    const params = new HttpParams()
      .set('userId', `${userId}`)
      .set('tenantId', `${tenantId}`)
      .set('baseLineId', `${baseLineId}`);
    return this.http.get<any>(`${this.apiUrl}/BaseLine/GetBaseLineCount`, { params });
  }

}
