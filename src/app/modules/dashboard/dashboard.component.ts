import { Component, AfterViewInit, inject, OnInit } from '@angular/core';
import { ReleaseStatsComponent } from './dashboard-components/our-visiter/release-stats.component';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { BugsService } from '../../core/api-services';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReleaseStatsComponent, ReactiveFormsModule,NgFor],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  private readonly bugsService = inject(BugsService)
  Item$ !: Observable <any>

  constructor() {
  }

  ngOnInit() {
    this.Item$ = this.bugsService.getbugsStats()
  }

}
