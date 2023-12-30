
import { Injectable } from '@angular/core';
import { bugsItems, statsItems } from '../constances/fake.bugs';
import { of } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class BugsService {
  constructor() {}
  bugsItems = bugsItems;
  statsItems =  statsItems
  getBugs() {
    return of({ items: this.bugsItems });
  }

  getbugsStats(){
    return of({ items: this.statsItems });
  }

}
