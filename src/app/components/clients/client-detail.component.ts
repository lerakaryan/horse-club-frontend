import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule],
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  client: Client = { firstName: '', lastName: '', phoneNumber: '', username: '', password: '' };
  loading = true;
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clientService.getById(+id).subscribe(client => {
        this.client = client;
        this.client.password = '';
        this.loading = false;
      });
    }
  }

  onSubmit() {
    this.saving = true;
    if (this.client.id) {
      this.clientService.update(this.client.id, this.client).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    } else {
      this.clientService.create(this.client).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }

  navigateToClients() {
    this.router.navigate(['/clients']);
  }
}
