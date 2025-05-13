import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from '../../services/instructor.service';
import { Instructor } from '../../models/instructor.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-instructor-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.scss']
})
export class InstructorFormComponent implements OnInit {
  @Input() instructor: Instructor = { firstName: '', lastName: '' };
  @Output() save = new EventEmitter<Instructor>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private instructorService: InstructorService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.instructorService.getInstructorById(+id).subscribe({
        next: (instructor: Instructor) => {
          if (instructor) {
            this.instructor = instructor;
          }
        },
        error: (err) => {
          this.snackBar.open('Ошибка при загрузке инструктора', 'OK', { duration: 3000 });
        }
      });
    }
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.instructorService.updateInstructor(+id, this.instructor).subscribe({
        next: () => {
          this.snackBar.open('Инструктор успешно обновлен', 'OK', { duration: 2000 });
          this.save.emit(this.instructor);
        },
        error: (err) => {
          this.snackBar.open('Ошибка при обновлении инструктора', 'OK', { duration: 3000 });
        }
      });
    } else {
      this.instructorService.createInstructor(this.instructor).subscribe({
        next: (createdInstructor) => {
          this.snackBar.open('Инструктор успешно добавлен', 'OK', { duration: 2000 });
          this.save.emit(createdInstructor);
        },
        error: (err) => {
          this.snackBar.open('Ошибка при добавлении инструктора', 'OK', { duration: 3000 });
        }
      });
    }
  }

  onCancel() {
    this.cancel.emit();
    this.router.navigate(['/instructors']);
  }
}
