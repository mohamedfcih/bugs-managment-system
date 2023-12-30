import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { StorageService } from 'src/app/core/services/storage.service';
import { Keys } from 'src/app/core/constances';
import { Language } from 'src/app/core/models/common/localization.model';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  imports: [MatIconModule, MatSelectModule, TranslateModule],
  standalone: true,
})
export class LanguageSelectorComponent implements OnInit {
  private readonly translateService = inject(TranslateService);
  private readonly storageService = inject(StorageService);
  private readonly document: Document = inject(DOCUMENT);

  public language = Language;
  public selectedLang: Language = Language.ENGLISH;

  ngOnInit() {
    this.selectedLang =
      (this.storageService.getLocal(Keys.Language) as Language) ??
      this.selectedLang;

    this.onChangeLang();
  }

  onChangeLang() {
    this.translateService.use(this.selectedLang);

    const htmlElement = this.document.getElementsByTagName('html')[0];

    htmlElement.setAttribute(
      Keys.Direction,
      this.selectedLang === Language.ENGLISH
        ? Keys.LeftToRight
        : Keys.RightToLeft
    );

    htmlElement.setAttribute(Keys.Language, this.selectedLang);
    this.storageService.setLocal(Keys.Language, this.selectedLang);
  }
}
