// import { TranslationEngineService } from './shared/translation-engine/translation-engine.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslationEngineComponent } from './shared/translation-engine/translation-engine.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LangDropdownComponent } from './shared/lang-dropdown/lang-dropdown.component';


@NgModule({
  declarations: [
    AppComponent,
    TranslationEngineComponent,
    LangDropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
