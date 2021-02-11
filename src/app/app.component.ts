import { Component } from '@angular/core';
import {OptionInterface} from './interfaces/option';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  options: OptionInterface[] = [
    {label: 'Afghanistan', value: 'AF', otherProp: 'manoj'},
    {label: 'Albania', value: 'AL'},
    {label: 'Bahamas', value: 'BS'},
    {label: 'Bangladesh', value: 'BD'},
    {label: 'Cambodia', value: 'KH'},
    {label: 'Canada', value: 'CA'},
    {label: 'Denmark', value: 'DK'},
    {label: 'Dominica', value: 'DM'},
    {label: 'India', value: 'IN'},
    {label: 'United States', value: 'US'},
    {label: 'Malaysia', value: 'MA'},
    {label: 'Russia', value: 'RU'}
  ];

  selectedValues(values) {
    console.log(values);
  }
}
