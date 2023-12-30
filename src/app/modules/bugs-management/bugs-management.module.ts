import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from 'src/app/shared/components/input-text/input-text.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { BugsListComponent } from './components/bugs-list/bugs-list.component';
import { BugsManagementRoutingModule } from './bugs-management-routing.module';
import { BugsFilterComponent } from './components/bugs-filter/bugs-filter.component';
const MATERIAL = [
  MatCardModule,
  MatButtonModule,
  MatTooltipModule,
  MatIconModule,
];

@NgModule({
  declarations: [BugsListComponent],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    InputTextComponent,
    BugsManagementRoutingModule,
    BugsFilterComponent,
    TableComponent,
    ...MATERIAL,
  ],
})
export class BugsManagementModule { }
