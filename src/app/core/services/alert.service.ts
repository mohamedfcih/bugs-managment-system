import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { from } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly translate = inject(TranslateService)


  alert(message: string) {
    Swal.fire({
      icon: 'success',
      text: this.translate.instant(message),
      confirmButtonText: this.translate.instant('close'),
      timer: 2000,
    });
  }

  info(message: string) {
    Swal.fire({
      icon: 'info',
      text: this.translate.instant(message),
      confirmButtonText: this.translate.instant('close'),
      timer: 2000,
    });
  }

  warning(message: string) {
    Swal.fire({
      icon: 'warning',
      text: this.translate.instant(message),
      confirmButtonText: this.translate.instant('close'),
      timer: 2000,
    });
  }

  confirm(message: string, title = this.translate.instant('message.confirm')) {
    return from(
      Swal.fire({
        icon: 'warning',
        title: this.translate.instant(title),
        text: this.translate.instant(message),
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: this.translate.instant('yes'),
        cancelButtonText: this.translate.instant('close'),
      })
    );
  }

  error(message: string, title = this.translate.instant('message.error')) {
    Swal.fire({
      icon: 'error',
      title: this.translate.instant(title),
      text: this.translate.instant(message),
      confirmButtonText: this.translate.instant('close'),
    });
  }
}
