import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../models/training.model';
import { Instructor } from '../models/instructor.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private apiUrl = environment.apiUrl + '/trainings';

  constructor(private http: HttpClient) {}

  getTrainingById(id: number): Observable<Training> {
    return this.http.get<Training>(`${this.apiUrl}/${id}`);
  }

  createTraining(training: Training): Observable<Training> {
    return this.http.post<Training>(this.apiUrl, training);
  }

  updateTraining(id: number, training: Training): Observable<Training> {
    return this.http.put<Training>(`${this.apiUrl}/${id}`, training);
  }

  deleteTraining(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllTrainings(): Observable<Training[]> {
    return this.http.get<Training[]>(this.apiUrl);
  }

  findNearestTrainingByInstructor(instructorId: number): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/nearest-by-instructor/${instructorId}`);
  }

  findGroupTrainingsByInstructorAndTime(instructorId: number): Observable<Training[]> {
    return this.http.get<Training[]>(`${this.apiUrl}/group-by-instructor/${instructorId}`);
  }

  // клиент инструктор лошадь
  getClientAndInstructorByTrainingId(id: number): Observable<string[][]> {
    return this.http.get<string[][]>(`${this.apiUrl}/${id}/client-instructor`);
  }
}
