import { Component, OnInit } from '@angular/core';
import { InstructorService } from '../../services/instructor.service';
import { Instructor } from '../../models/instructor.model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.scss'],
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class InstructorListComponent implements OnInit {
  instructors: Instructor[] = [];
  showFiltered = false;

  constructor(
    private instructorService: InstructorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadInstructors();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToHorses() {
    this.router.navigate(['/horses']);
  }

  loadInstructors() {
    this.instructorService.getAllInstructors().subscribe({
      next: (data) => {
        this.instructors = data;
        this.showFiltered = false;
      },
      error: (err) => {
        this.snackBar.open('Ошибка при загрузке инструкторов', 'OK', { duration: 3000 });
        this.instructors = [];
      }
    });
  }

  addInstructor() {
    this.router.navigate(['/instructors/new']);
  }

  editInstructor(instructor: Instructor) {
    this.router.navigate(['/instructors', instructor.id]);
  }

  deleteInstructor(instructor: Instructor) {
    if (instructor.id && confirm('Удалить инструктора?')) {
      this.instructorService.deleteInstructor(instructor.id).subscribe(() => this.loadInstructors());
    }
  }

  loadInstructorsWithExpiredInsurance() {
    this.instructorService.getInstructorsWithExpiredInsurance().subscribe(data => {
      this.instructors = data;
      this.showFiltered = true;
    });
  }
  
  // countTrainingsPerInstructorLastMonth() {
  //   this.instructorService.countTrainingsPerInstructorLastMonth().subscribe(data => {
  //     this.instructors = data;
  //     this.showFiltered = true;
  //   });
  // }
}