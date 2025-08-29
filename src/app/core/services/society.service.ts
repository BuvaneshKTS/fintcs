// src/app/services/society.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocietyService {
  private baseUrl = 'https://fintcsapi-1.onrender.com/api/society';

  constructor(private http: HttpClient) {}

  getSociety(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  updateSociety(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`, data);
  }

  getPendingChanges(): Observable<any> {
    return this.http.get(`${this.baseUrl}/pending-changes`);
  }

  approveChanges(): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve-changes`, {});
  }
}
