import { ChangeDetectionStrategy, Component, Renderer2, RendererFactory2, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-mode-toggler',
  templateUrl: './mode-toggler.component.html',
  styleUrls: ['./mode-toggler.component.scss'],
  standalone:true,
  imports:[MatSlideToggleModule,FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModeTogglerComponent {
  isChecked:boolean = false
  private renderer: Renderer2;
  private readonly darkModeStorageKey = 'darkModeEnabled';
  private readonly storageService =inject(StorageService);


  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }
  toggle(event: any) {
    const darkModeEnabled = event.checked;
    this.toggleDarkMode(darkModeEnabled);
  }

  toggleDarkMode(darkMode: boolean) {
    if (darkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }

    this.storageService.setLocal(this.darkModeStorageKey, JSON.stringify(darkMode))
  }

  loadDarkModePreference() {
    const darkModeEnabled = this.storageService.getLocal(this.darkModeStorageKey)
    if (darkModeEnabled) {
      this.toggleDarkMode(JSON.parse(darkModeEnabled));
    }
  }
}

