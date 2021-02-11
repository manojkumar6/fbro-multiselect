import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MultiselectComponent } from './multiselect.component';

@NgModule({
  declarations: [MultiselectComponent],
  imports: [BrowserModule],
  exports: [MultiselectComponent]
})
export class MultiselectModule { }
