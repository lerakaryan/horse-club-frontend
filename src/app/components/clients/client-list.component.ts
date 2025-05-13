import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../models/client.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  showFiltered = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientService.getAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.showFiltered = false;
      },
      error: (err) => {
        if (err.status === 403) {
          this.snackBar.open('Недостаточно прав для просмотра', 'OK', { duration: 3000 });
          this.clients = [];
        }
      }
    });
  }

  showClientsWithMoreThan5Trainings() {
    this.clientService.getClientsWithMoreThan5Trainings().subscribe(data => {
      this.clients = data;
      this.showFiltered = true;
    });
  }

  addClient() {
    this.router.navigate(['/clients/new']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  editClient(client: Client) {
    this.router.navigate(['/clients', client.id]);
  }

  deleteClient(client: Client) {
    if (client.id && confirm('Удалить клиента?')) {
      this.clientService.delete(client.id).subscribe(() => this.loadClients());
    }
  }
}
