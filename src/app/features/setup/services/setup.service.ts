import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { SimulationCopy } from 'src/app/features/setup/models/simulation';

@Injectable({
  providedIn: 'root'
})
export class SetupService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.champsApiUrl;

  getUserInformation() {
    const userInfo =
    {
      userId: 1,
      createdBy: 'Manoj',
      dateFormat: environment.dateFormat
    };
    return userInfo;

  }

  getAllUserBaselines(userId: number, tenantId: number) {
    const params = new HttpParams()
      .set('userId', `${userId}`)
      .set('tenantId', `${tenantId}`)
    return this.http.get<any>(`${this.apiUrl}/BaseLine/GetByUserTenant`, { params });
  }

  isBaselineNameExists(baseLineName: string) {
    const params = new HttpParams()
      .set('baseLineName', `${baseLineName}`)
    return this.http.get<any>(`${this.apiUrl}/BaseLine/GetByName`, { params });
  }

  getAllTenants(userId: number, tenantId: number) {
    const params = new HttpParams()
      .set('userId', `${userId}`)
      .set('tenantId', `${tenantId}`)
    return this.http.get<any>(`${this.apiUrl}/Tenant/GetByUserTenant`, { params });
  }

  postBaseLineSave(baseline: any) {
    debugger;
    let bline = {
      baselineId: baseline.baselineId,
      userId: baseline.userId,
      tenantId: baseline.tenantId,
      baselineName: baseline.baselineName,
      baselineYear: baseline.baselineYear,
      createdBy: baseline.createdBy,
      lastUpdatedBy: baseline.lastUpdatedBy,
      accessPrivatePublicControlled: baseline.access,
      currency: baseline.currency,
      precision: baseline.precision,
      status: baseline.status,
    };
    console.log(bline);
    return this.http.post(`${this.apiUrl}/BaseLine/Save`, bline
    );
  }

  removeBaseLine(id: number) {
    return this.http.post(`${this.apiUrl}/BaseLine/remove`,
      {
        baselineId: id,
      });
  }

  //////////////////////////////
  getAllUserSimulations(userId: number, tenantId: number) {
    const params = new HttpParams()
      .set('userId', `${userId}`)
      .set('tenantId', `${tenantId}`)
    return this.http.get<any>(`${this.apiUrl}/Simulation/GetByUserTenant`, { params });
  }


  postSimulationCopy(sim: SimulationCopy) {
    console.log(sim);
    console.log("==========================================================");
    return this.http.post(`${this.apiUrl}/Simulation/Copy`, sim
    );
  }
}
