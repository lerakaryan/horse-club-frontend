import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Instructor } from '../../models/instructor.model';
import { InstructorService } from '../../services/instructor.service';

@Component({
  selector: 'app-instructor-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.scss']
})
export class InstructorDetailComponent implements OnInit {
  instructor: Instructor = { firstName: '', lastName: '' };
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private instructorService: InstructorService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.instructorService.getInstructorById(+id).subscribe(instructor => {
        this.instructor = instructor;
        this.loading = false;
      });
    }
  }

  onSubmit() {
    if (this.instructor.id) {
      this.instructorService.updateInstructor(this.instructor.id, this.instructor).subscribe(() => {
        this.router.navigate(['/instructors']);
      });
    } else {
      this.instructorService.createInstructor(this.instructor).subscribe(() => {
        this.router.navigate(['/instructors']);
      });
    }
  }

  navigateToInstructors() {
    this.router.navigate(['/instructors']);
  }
}
