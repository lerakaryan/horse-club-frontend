import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horse } from '../models/horse.model';

@Injectable({ providedIn: 'root' })
export class HorseService {
  private apiUrl = environment.apiUrl + '/horses'; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Horse[]> {
    return this.http.get<Horse[]>(this.apiUrl);
  }

  getById(id: number): Observable<Horse> {
    return this.http.get<Horse>(`${this.apiUrl}/${id}`);
  }

  create(horse: Horse): Observable<Horse> {
    return this.http.post<Horse>(this.apiUrl, horse);
  }

  update(id: number, horse: Horse): Observable<Horse> {
    return this.http.put<Horse>(`${this.apiUrl}/${id}`, horse);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
