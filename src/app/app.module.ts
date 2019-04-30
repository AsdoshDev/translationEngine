// import { TranslationEngineService } from './shared/translation-engine/translation-engine.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslationEngineComponent } from './shared/translation-engine/translation-engine.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LangDropdownComponent } from './shared/lang-dropdown/lang-dropdown.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TranslationEngineComponent,
    LangDropdownComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
