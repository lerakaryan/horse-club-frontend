import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainingService } from '../../services/training.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InstructorService } from '../../services/instructor.service';
import { HorseService } from '../../services/horse.service';
import { ClientService } from '../../services/client.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@Component({
  selector: 'app-training-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent {
  trainingForm: FormGroup;
  instructors: any[] = []; 
  horses: any[] = []; 
  clients: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private trainingService: TrainingService,
    private instructorService: InstructorService, 
    private horseService: HorseService, 
    private clientService: ClientService,
    private router: Router
  ) {
    this.trainingForm = this.fb.group({
        clientId: ['', Validators.required],
        instructorId: ['', Validators.required], 
        horseId: ['', Validators.required],
        dateTime: ['', Validators.required],
        duration: ['', [Validators.required, Validators.min(30), Validators.max(90)]]
      });
  }

  ngOnInit() {
    this.loadInstructors(); 
    this.loadHorses(); 
    this.loadClients();
  }

  loadInstructors() {
    this.instructorService.getAllInstructors().subscribe(data => {
      this.instructors = data; 
    });
  }

  loadHorses() {
    this.horseService.getAll().subscribe(data => {
      this.horses = data; 
    });
  }

  loadClients() {
    this.clientService.getAll().subscribe(data => {
      this.clients = data; 
    });
  }

  onSubmit() {
    if (this.trainingForm.valid) {
      this.trainingService.createTraining(this.trainingForm.value).subscribe(() => {
        this.router.navigate(['/trainings']);
      });
    }
  }
}