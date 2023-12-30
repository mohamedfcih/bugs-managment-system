import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const BASE_ICON_SRC = './assets/icons';
const icons = [
  {
    name: 'suadi-flag',
    src: '/saudi-flag.svg',
  },
  {
    name: 'usa-flag',
    src: '/usa-flag.svg',
  },
];

@Injectable({
  providedIn: 'root',
})
export class CustomIconsService {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  load() {
    icons.forEach((icon) => {
      this.iconRegistry.addSvgIcon(
        icon.name,
        this.sanitizer.bypassSecurityTrustResourceUrl(BASE_ICON_SRC + icon.src)
      );
    });
  }
}
