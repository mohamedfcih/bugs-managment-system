import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, of, take, tap } from 'rxjs';
import { BugOperationComponent } from '../bug-operation/bug-operation.component';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';
import { BugsService } from 'src/app/core/api-services/bugs.service';
import { TableCols } from '../../../../core/constances/keys.const';

@Component({
  selector: 'app-bugs-list',
  templateUrl: './bugs-list.component.html',
  styleUrls: ['./bugs-list.component.scss'],
})
export class BugsListComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly dialog = inject(MatDialog);
  private readonly bugsService = inject(BugsService);
  private readonly alert = inject(AlertService);
  private readonly route = inject(ActivatedRoute);

  Item$ =  this.bugsService.getBugs();
  displayedColumns = TableCols;
  filter = { title: '', status: '', severity: '', release: '' };

  myActions = [
    { label: 'To do', action: this.changeStatus },
    { label: 'In Progress', action: this.changeStatus },
    { label: 'Done', action: this.changeStatus },
    { label: 'Canceled', action: this.changeStatus },
  ];

  constructor() {}

  ngOnInit() {
    this.filterFromDB();
  }

  filterFromDB() {
    this.Item$.pipe(
      filter(data => !!data),
      take(1)
    ).subscribe((data) => {
      this.route.queryParams.subscribe((params) => {
        const dashBoardFilter = params['data'];
        if (dashBoardFilter) {
          const obj = JSON.parse(dashBoardFilter);
          this.filter = {
            ...this.filter,
            status: obj.status,
            release: obj.release,
          };
          this.filterBugs(this.filter);
        }
      });
    });
  }
  filterBugs(filter: {
    title: string;
    release: string;
    status: string;
    severity: string;
  }) {
    this.Item$ = this.Item$.pipe(
      map((data) => ({
        ...data,
        items: data.items.filter((item: any) => {
          const filterTitle = filter.title && filter.title.trim() !== '';
          const filterRelease = filter.release && filter.release.trim() !== '';
          const filterStatus = filter.status && filter.status.trim() !== '';
          const filterSeverity =
            filter.severity && filter.severity.trim() !== '';
          if (
            filterTitle &&
            !item.title.toLowerCase().includes(filter.title.toLowerCase())
          ) {
            return false;
          }

          if (
            filterRelease &&
            !item.release.toLowerCase().includes(filter.release.toLowerCase())
          ) {
            return false;
          }

          if (
            filterStatus &&
            !item.status.toLowerCase().includes(filter.status.toLowerCase())
          ) {
            return false;
          }
          if (
            filterSeverity &&
            !item.severity.toLowerCase().includes(filter.severity.toLowerCase())
          ) {
            return false;
          }

          return true;
        }),
      }))
    );
  }

  onActionSelected(event: { action: string; item: any }) {
    this.changeStatus(event);
    this.cdr.markForCheck();
  }

  changeStatus(payload: any) {
    this.Item$ = this.Item$.pipe(
      map((data) => ({
        ...data,
        items: data.items.map((item: any) => {
          if (item.title === payload.item.title) {
            return { ...item, status: payload.action };
          }
          this.alert.alert('success_messages.changed_success');
          return item;
        }),
      }))
    );
  }

  openItemDialog(action: 'add' | 'view', item?: any): void {
    const dialogRef = this.dialog.open(BugOperationComponent, {
      width: '700px',
      height: '500px',
      data: { mode: action, item },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.Item$ = this.Item$.pipe(
          map((data) => ({
            ...data,
            items: [result, ...data.items],
          }))
        );
        this.alert.alert('success_messages.create_success');
      }
    });
  }

  onRowClick(row: any) {
    this.openItemDialog('view', row);
  }

  clearFilters() {
    this.Item$ = this.bugsService.getBugs();
  }
}
