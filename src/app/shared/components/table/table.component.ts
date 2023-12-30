import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
export interface ViewContext<T> {
  $implicit: T;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    TranslateModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit, OnChanges {
  @Input() data: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() pageSize: number = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 25];
  @Input() actions: { label: string; action: (item: any) => void }[] = []; // Input for actions
  @Output() pageChange: EventEmitter<any> = new EventEmitter();
  @Output() actionSelected: EventEmitter<{ action: string; item: any }> =
    new EventEmitter(); // Output for action selection
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Output() rowClicked = new EventEmitter<any>();

  ngAfterViewInit() {
    this.updateTable();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.updateTable();
  }

  updateTable() {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.changeDetectorRef.detectChanges();
  }
  onPageChange(event: any) {
    this.pageChange.emit(event);
  }

  rowClick(event:MouseEvent,row:any) {
    const targetElement = event.target as HTMLElement;
    if (targetElement && targetElement.classList.contains('mat-icon')) {
      event.stopPropagation();
    } else {
      this.rowClicked.emit(row);
    }

  }
  onActionSelect(action: string, item: any) {
    this.actionSelected.emit({ action, item });
  }
}
