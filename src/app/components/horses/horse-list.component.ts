import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';
import { Horse } from '../../models/horse.model';
import { HorseService } from '../../services/horse.service';

@Component({
  selector: 'app-horse-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './horse-list.component.html',
  styleUrls: ['./horse-list.component.scss']
})
export class HorseListComponent implements OnInit {
  @Input() horses: Horse[] = [];
  @Output() select = new EventEmitter<Horse>();
  @Output() edit = new EventEmitter<Horse>();
  @Output() delete = new EventEmitter<Horse>();

  constructor(private horseService: HorseService, private router: Router) { }

  ngOnInit(): void {
    this.horseService.getAll().subscribe(horses => {
      this.horses = horses;
    });
  }

  editHorse(horse: Horse) {
    this.router.navigate([`/horses/${horse.id}`]);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToClients() {
    this.router.navigate(['/clients']);
  }
  
  goToInstructors() {
    this.router.navigate(['/instructors']);
  }

  goToTrainings() {
    this.router.navigate(['/trainings']);
  }
  
  goToAddHorse() {
    this.router.navigate(['/horses/new']);
  }

  confirmAndDelete(horse: Horse) {
    if (confirm('Вы действительно хотите удалить лошадь?')) {
      if (horse.id !== undefined) {
        this.horseService.delete(horse.id).subscribe({
          next: () => {
            this.horses = this.horses.filter(h => h.id !== horse.id);
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 403) {
              alert('Недостаточно прав для этого действия');
            }
          }
        });
      }
      };
    }
  }
