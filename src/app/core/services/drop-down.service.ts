import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  apiUrl = environment.champsApiUrl;
  constructor(private http: HttpClient) { }

  getUserBaselines(userId: number): Observable<any> {
    const params = new HttpParams()
      .set('userId', `${userId}`);
    return this.http.get<any>(`${this.apiUrl}/dropdown/BaseLine`, { params });
  }

  getSimulationsByBaseline(baselineId: number): Observable<any> {
    const params = new HttpParams()
      .set('baselineId', `${baselineId}`);
    return this.http.get<any>(`${this.apiUrl}/dropdown/Simulation`, { params });
  }

  getChannelsByBaseline(baselineId: number): Observable<any> {
    const params = new HttpParams()
      .set('baselineId', `${baselineId}`);
    return this.http.get<any>(`${this.apiUrl}/dropdown/Channel`, { params });
  }

  getBrandsByBaseline(baselineId: number): Observable<any> {
    const params = new HttpParams()
      .set('baselineId', `${baselineId}`);
    return this.http.get<any>(`${this.apiUrl}/dropdown/Brand`, { params });
  }

  getPacksByBaseline(baselineId: number): Observable<any> {
    const params = new HttpParams()
      .set('baselineId', `${baselineId}`);
    return this.http.get<any>(`${this.apiUrl}/dropdown/Pack`, { params });
  }
}
