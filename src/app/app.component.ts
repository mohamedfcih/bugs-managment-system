import { Component, OnInit, inject } from '@angular/core';
import { CustomIconsService } from './core/services/custom-icons.service';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  private readonly iconsService = inject(CustomIconsService);
  private readonly loader = inject(LoaderService);
  showLoader = false;
  ngOnInit(): void {
    this.iconsService.load();
    this.loader.isLoading$.subscribe(isLoading => {
      setTimeout(() => {
        this.showLoader = isLoading;
      });
    });
  }
}
