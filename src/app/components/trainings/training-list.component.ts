import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../services/training.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-training-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss']
})
export class TrainingListComponent implements OnInit {
  trainings: any[] = [];

  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadTrainings();
  }

  loadTrainings() {
    this.trainingService.getAllTrainings().subscribe({
        next: (data) => {
            this.trainings = data;
            this.trainings.forEach(training => {
                this.trainingService.getClientAndInstructorByTrainingId(training.id).subscribe((names: string[][]) => {
                    console.log(names); // Проверка структуры данных
                    const [clientInfo] = names; // Извлекаем первый элемент массива
                    const [clientName, instructorName, horseName] = clientInfo; // Распаковка вложенного массива
                    training.clientName = clientName; 
                    training.instructorName = instructorName; 
                    training.horseName = horseName; 
                });
            });
        }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToHorses() {
    this.router.navigate(['/horses']);
  }

  editTraining(training: any) {
    this.router.navigate(['/trainings', training.id]);
  }

  deleteTraining(training: any) {
    if (training.id && confirm('Удалить тренировку?')) {
      this.trainingService.deleteTraining(training.id).subscribe(() => {
        this.loadTrainings(); // Обновляем список тренировок
      });
    }
  }
}