import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, User, RegisterRequest } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SocietyUsersService {
  private readonly BASE_URL = 'https://fintcsapi-1.onrender.com/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.BASE_URL}/users`);
  }

  getById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.BASE_URL}/users/${id}`);
  }

  create(user: RegisterRequest): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.BASE_URL}/auth/register`, user);
  }

  update(id: number, user: Partial<RegisterRequest>): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.BASE_URL}/auth/update/${id}`, user);
  }

  delete(id: number): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.BASE_URL}/auth/delete/${id}`);
  }
}
