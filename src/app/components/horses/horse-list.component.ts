import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
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

  constructor(private horseService: HorseService) {}

  ngOnInit() {
    this.horseService.getAll().subscribe(horses => {
      this.horses = horses;
    });
  }
  @Input() horses: Horse[] = [];
  @Output() select = new EventEmitter<Horse>();
  @Output() edit = new EventEmitter<Horse>();
  @Output() delete = new EventEmitter<Horse>();
}
