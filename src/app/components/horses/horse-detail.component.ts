import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Horse } from '../../models/horse.model';
import { HorseService } from '../../services/horse.service';

@Component({
  selector: 'app-horse-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './horse-detail.component.html',
  styleUrls: ['./horse-detail.component.scss']
})
export class HorseDetailComponent implements OnInit {
  navigateToHorses() {
    this.router.navigate(['/horses']);
  }
  horse: Horse = { name: '', breed: '' };
  loading = true;
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private horseService: HorseService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.horseService.getById(id).subscribe({
        next: (horse) => {
          this.horse = horse;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          if (err.status === 403) {
            window.alert('Для просмотра или редактирования лошади нужно войти в свой аккаунт.');
            this.router.navigate(['/login']);
          } else {
            window.alert('Ошибка при загрузке лошади.');
          }
        }
      });
    }
  }

  save() {
    if (!this.horse.id) return;
    this.saving = true;
    this.horseService.update(this.horse.id, this.horse).subscribe(() => {
      this.saving = false;
      // Можно добавить уведомление или редирект
      this.router.navigate(['/horses']);
    });
  }
}

