import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Horse } from '../../models/horse.model';
import { HorseService } from '../../services/horse.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-horse-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './horse-form.component.html',
  styleUrls: ['./horse-form.component.scss']
})
export class HorseFormComponent {
  @Input() horse: Horse = { name: '', breed: '' };
  @Output() save = new EventEmitter<Horse>();

  constructor(private horseService: HorseService, private router: Router) {}


  onSubmit() {
    this.horseService.create(this.horse).subscribe({
      next: () => {
        // Перенаправление после успешного создания
        this.router.navigate(['/horses']);
      },
      error: (err) => {
        console.error('Ошибка при добавлении лошади', err);
      }
    });
  }
  goToHorses() {
    this.router.navigate(['/horses']);
  }
}
