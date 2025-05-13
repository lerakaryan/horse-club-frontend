import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl + '/auth'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/login`,
      { username, password },
      { responseType: 'text' as 'json' }
    );
  }

  register(data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    username: string;
    password: string;
  }): Observable<string> {
    return this.http.post<string>(
      `${this.apiUrl}/register`,
      data,
      { responseType: 'text' as 'json' }
    );
  }

    /* Сохраняет JWT-токен в localStorage */
    saveToken(token: string): void {
      localStorage.setItem('token', token);
    }
  
    /* Получает JWT-токен из localStorage */
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    /* Удаляет JWT-токен из localStorage (выход пользователя) */
    removeToken(): void {
      localStorage.removeItem('token');
    }

}
