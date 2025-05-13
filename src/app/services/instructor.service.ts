import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Instructor } from '../models/instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {
  private apiUrl = environment.apiUrl + '/instructors';

  constructor(private http: HttpClient) {}

  getInstructorById(id: number): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.apiUrl}/${id}`);
  }

  createInstructor(instructor: Instructor): Observable<Instructor> {
    return this.http.post<Instructor>(this.apiUrl, instructor);
  }

  updateInstructor(id: number, instructor: Instructor): Observable<Instructor> {
    return this.http.put<Instructor>(`${this.apiUrl}/${id}`, instructor);
  }

  deleteInstructor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.apiUrl);
  }

  getInstructorsWithExpiredInsurance(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(`${this.apiUrl}/expired-insurance`);
  }

  countTrainingsPerInstructorLastMonth(): Observable<Object[]> {
    return this.http.get<Object[]>(`${this.apiUrl}/training-count-last-month`);
  }
}