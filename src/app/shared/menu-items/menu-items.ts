import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'dashboard.title',
    type: 'link',
    icon: 'bar_chart',
  },

  {
    state: 'bugs',
    name: 'bugs_management.title',
    type: 'link',
    icon: 'bug_report',
  },



];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
