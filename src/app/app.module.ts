import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MultiselectModule } from 'multiselect';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MultiselectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
