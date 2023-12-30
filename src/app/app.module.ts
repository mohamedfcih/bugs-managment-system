import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  HttpClientModule,
  HttpClient,
  HttpBackend,
} from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FullComponent } from './layouts/full/full.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { LanguageSelectorComponent } from './shared/language-selector/language-selector.component';

// localization modules
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ModeTogglerComponent } from './shared/mode-toggler/mode-toggler.component';


export function HttpLoaderFactory(httpHandler: HttpBackend) {
  return new TranslateHttpLoader(
    new HttpClient(httpHandler),
    './assets/i18n/',
    '.json'
  );
}

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes, {
      bindToComponentInputs: true,
    }),
    AppSidebarComponent,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpBackend],
      },
    }),
    LanguageSelectorComponent,
    ModeTogglerComponent,
    LoaderComponent,
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
