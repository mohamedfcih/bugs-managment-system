import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { releases, severityList } from 'src/app/core/constances/keys.const';
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component';
import { SelectComponent } from 'src/app/shared/components/select/select.component';

@Component({
  selector: 'app-bug-operation',
  templateUrl: './bug-operation.component.html',
  styleUrls: ['./bug-operation.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    InputTextComponent,
    SelectComponent,
    ReactiveFormsModule,
    TranslateModule,
    FormsModule,
    NgFor,
    NgIf,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BugOperationComponent implements OnInit {
  severityList = severityList
  releases = releases

  filter!: { title: string; release: string; status: string };

  private readonly cdr = inject(ChangeDetectorRef);
  form = new FormGroup({
    title: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(75),
      ],
      nonNullable: true,
    }),
    severity: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(75),
      ],
      nonNullable: true,
    }),

    release: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(75),
      ],
      nonNullable: true,
    }),

    description: new FormControl<string>('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(75),
      ],
      nonNullable: true,
    }),
    links: new FormArray([]),
  });

  constructor(
    public dialogRef: MatDialogRef<BugOperationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addInput(item: string = '') {
    this.links.controls.push(new FormControl<string>(item));
  }

  ngOnInit(): void {
    this.form.patchValue({ ...this.data.item });
    const links = this.data.item.links || [];
    links.forEach((element: string) => {
      this.addInput(element);
    });

    if (this.data.mode === 'view') {
      this.form.disable();
      this.links.disable();
    }
  }

  removeItem(index: number) {
    this.links.removeAt(index);
  }

  get links() {
    return this.form.get('links') as FormArray;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addbug() {
    this.dialogRef.close({
      ...this.form.getRawValue(),
      status: 'To Do',
    });
  }
}
