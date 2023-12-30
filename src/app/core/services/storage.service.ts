import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly cookieService = inject(CookieService);

  setLocal(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getLocal(key: string) {
    return localStorage.getItem(key);
  }

}
