import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  inject,
  DestroyRef,
  Input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { distinctUntilChanged, debounceTime, filter, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class SearchInputComponent implements OnInit {
  @Input() debounceTime: number = 700;
  private readonly destroyRef = inject(DestroyRef);

  searchCtrl = new FormControl<string>('', {
    nonNullable: true,
  });

  private _placeholer!: string;

  @Input({ required: true }) set placeholer(value: string) {
    this._placeholer = value;
  }

  get placeholer() {
    return this._placeholer;
  }

  @Output() onChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.searchCtrl.valueChanges
      .pipe(
        startWith(''),
        distinctUntilChanged(),
        debounceTime(this.debounceTime),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((res) => this.onChange.emit(res));
  }
}
