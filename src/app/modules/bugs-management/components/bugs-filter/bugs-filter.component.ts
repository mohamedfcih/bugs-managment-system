import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import {
  releases,
  severityList,
  statusList,
} from 'src/app/core/constances/keys.const';
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component';
import { SearchInputComponent } from 'src/app/shared/components/search-input/search-input.component';
import { SelectComponent } from 'src/app/shared/components/select/select.component';

@Component({
  selector: 'app-bugs-filter',
  templateUrl: './bugs-filter.component.html',
  styleUrls: ['./bugs-filter.component.scss'],
  standalone: true,
  imports: [
    InputTextComponent,
    SelectComponent,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BugsFilterComponent {
  @ViewChild('filterForm') filterForm!: NgForm;
  @Output() onFilter = new EventEmitter<any>();
  @Output() onClear = new EventEmitter<any>();

  filterObj: {
    title: string;
    release: string;
    status: string;
    severity: string;
  } = { title: '', release: '', status: '', severity: '' };

  releases = releases;
  severityList = severityList;
  statusList = statusList;

  filter(event: any) {
    this.onFilter.emit(event);
  }

  clearFilters() {
    this.filterObj = { title: '', release: '', status: '' ,severity:''};
    this.filterForm.resetForm();
    this.onClear.emit();
  }
}
