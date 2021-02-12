# fbro-multiselect

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.7.

## Installation

```
npm i fbro-multiselect
```

## Usage

```ts
import {MultiselectModule} from "fbro-multiselect";

@NgModule({
    ...
    imports: [BrowserModule, MultiselectModule]
    ...
})
class MainModule { }
```

```html
<multiselect
  [options]="options"
  [filter]="true"
  filterBy="label"
  optionLabel="label"
  optionValue="value"
  (onChange)="selectedValues($event)"></multiselect>
</select2>
```

### properties and events

name | type | default | description | example
--- | --- | --- | --- | ---
options | `{}[]` array of objects | [] | Options on the dropdown | `options: {}[] = [{label:'option1', value:'one'}, ...]`
filter | boolean | false | Enable search options | `[filter]="true"`
filterBy | string | label | Object properties for search. add more properties seperated by comma (,) | `filterBy="label,value,customProp"`
optionLabel | string | label | text to show at dropdown option | `optionLabel="customProp"`
optionValue | string | value | value of the given label | `optionValue="customPropVal"`
onChange | method | | emmit event on change when add/remove value | `(onChange)="printTheChange($event)"`
