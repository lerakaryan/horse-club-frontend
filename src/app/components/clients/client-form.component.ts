import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-form',
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
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {
  @Input() client: Client = { firstName: '', lastName: '', phoneNumber: '', username: '', password: '', role: '' };
  @Output() save = new EventEmitter<Client>();
  @Output() cancel = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientService.getById(+id).subscribe({
        next: (client: Client) => {
          if (client) {
            this.client = client;
          }
        },
        error: (err) => {
          if (err.status === 403) {
            this.snackBar.open('Недостаточно прав для просмотра', 'OK', { duration: 3000 });
          }
        }
      });
    }
  }

  onSubmit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientService.update(+id, this.client).subscribe({
        next: () => {
          this.snackBar.open('Клиент успешно обновлён', 'OK', { duration: 2000 });
          this.save.emit(this.client);
        },
        error: (err) => {
          if (err.status === 403) {
            this.snackBar.open('Недостаточно прав для сохранения', 'OK', { duration: 3000 });
          }
        }
      });
    } else {
      this.clientService.create(this.client).subscribe({
        next: (createdClient) => {
          this.snackBar.open('Клиент успешно добавлен', 'OK', { duration: 2000 });
          this.save.emit(createdClient);
        },
        error: (err) => {
          if (err.status === 403) {
            this.snackBar.open('Недостаточно прав для сохранения', 'OK', { duration: 3000 });
          }
        }
      });
    }
  }

  onCancel() {
    this.cancel.emit();
    this.router.navigate(['/clients']);
  }
}
