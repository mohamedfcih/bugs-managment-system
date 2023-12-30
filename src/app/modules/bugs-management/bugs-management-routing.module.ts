import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BugsListComponent } from './components/bugs-list/bugs-list.component';

const routes: Routes = [
  {
    path: '',
    component: BugsListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BugsManagementRoutingModule{}
