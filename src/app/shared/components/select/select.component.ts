import { Component, Input, EventEmitter, Output } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import {
  MatFormFieldAppearance,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ValidationHandlerPipe } from '../../pipes/validation-handler.pipe';
import { Subscription } from 'rxjs';
export interface IDropDown {
  label: string;
  value: string;
}
@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ValidationHandlerPipe,
    NgFor,
    NgIf,
    AsyncPipe,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: SelectComponent,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() placeholder!: string;
  @Input() id!: string;
  @Input() appearance: MatFormFieldAppearance = 'outline';
  @Input() valueProps: string = 'value';
  @Input() labelProps: string = 'label';
  @Input() items!: any[];
  @Input() required: boolean = false;
  @Input() multiple: boolean = false;
  @Input() isLocalized: boolean = false;
  @Output() selectedItems = new EventEmitter();

  selectListControl = new FormControl('');
  subscription!: Subscription;
  touched = false;
  disabled = false;

  onTouched: () => void = () => { };

  // model --> view
  writeValue(value: string): void {
    if (value) {
      this.selectListControl.setValue(value);
    } else {
      this.selectListControl.reset('');
    }
  }

  // view --> model
  registerOnChange(fn: (value: string | null) => void) {
    this.subscription = this.selectListControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  validate(control: AbstractControl): ValidationErrors | null {
    setTimeout(() => this.selectListControl.setErrors(control.errors));
    return null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSelectChange(event: any) {
    this.selectedItems.emit(event.value);
  }

  setDisabledState(isDisabled: boolean) {
    if (isDisabled) this.selectListControl.disable();
  }
}
