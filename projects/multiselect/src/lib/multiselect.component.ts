import {
  Component, HostListener, Input, Output,
  OnInit, ViewChild, ElementRef, EventEmitter} from '@angular/core';
import {MultiselectInterface} from './multiselect.Interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'multiselect',
  template: `
    <div class="multiselect">
      <div class="chips" (click)="toggleInput($event, !openDropDown)">
        <div class="chip" *ngFor="let chip of selected; let i = index; trackBy: trackByFn">
          {{chip[optionLabel]}}
          <span class="removeChip" (click)="removeOption($event, i, chip)">&#x2716;</span>
        </div>
        <div class="placeholder" *ngIf="selected.length === 0">Select Options</div>
      </div>
      <div class="options" [class.show]="openDropDown" #dropdown>
        <div class="search-holder" *ngIf="filter">
          <input type="search" #searchInput placeholder="Search..." (input)="filterItem(searchInput.value)" [autofocus]="openDropDown">
        </div>
        <div class="option-holder">
          <div class="option"
               *ngFor="let option of filteredItems; trackBy: trackByFn"
               [class.selected]="option.selected"
               [class.hightlight]="option.highlight"
               (click)="select(option)">
            <div class="custom-check"></div> {{option[optionLabel]}}
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./multiselect.component.css']
})
export class MultiselectComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('options') inputOptions: MultiselectInterface[];
  @Input() filter = false;
  @Input() optionLabel: string;
  @Input() optionValue: string;
  @Input() filterBy: string;
  @Output() onChange = new EventEmitter();

  @ViewChild('dropdown') dropDown: ElementRef;
  openDropDown = false;
  selected = [];
  highlight = 0;
  filteredItems;
  trackByFn(index, item) {
    return item.id;
  }
  @HostListener('window:click', ['$event'])
  OutClick(event: MouseEvent) {
    if (this.openDropDown) {
      const {clientX, clientY} = event;
      const {top, right, bottom, left } = this.dropDown.nativeElement.getBoundingClientRect();
      if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
        this.openDropDown = false;
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  KeyboardEvents(event: KeyboardEvent) {
    if (this.openDropDown) {
      const key = event.code;
      if (key === 'Escape') {
        this.openDropDown = false;
      }
      if (['ArrowUp', 'ArrowDown'].includes(key)) {
        const nextOption = key === 'ArrowUp' ? this.highlight - 1 : this.highlight + 1;
        const itemLength = this.filteredItems.length;
        if (nextOption >= 0 && nextOption < itemLength) {
          this.filteredItems[this.highlight].highlight = false;
          this.filteredItems[nextOption].highlight = true;
          this.highlight = nextOption;
        }
      }
      if (key === 'Space') {
        this.select(this.filteredItems[this.highlight]);
      }
    }
  }

  mapInputs() {
    return this.inputOptions.map(o => {
      o.visible = true;
      o.selected = false;
      return o;
    });
  }

  toggleInput(event: MouseEvent, value) {
    event.stopPropagation();
    this.openDropDown = value;
    this.filteredItems[0].highlight = true;
  }
  filterItem(value) {
    const keys = this.filterBy.split(',');
    if (!value) {
      this.assignCopy();
    }
    this.filteredItems = Object.assign([], this.inputOptions
      .filter(option => keys.some(v => option[v]?.toLowerCase().includes(value.toLowerCase()))));
  }
  assignCopy() {
    this.filteredItems = Object.assign([], this.inputOptions);
  }
  emmitValue() {
    this.onChange.emit(this.selected.map(s => {
      const {visible, selected, highlight, ...rest} = s;
      return rest;
    }));
  }

  select(option: MultiselectInterface): void {
    option.selected = !option.selected;
    if (option.selected) {
      this.selected.push(option);
      this.emmitValue();
    } else {
      const i = this.selected.findIndex(o => o.value === option[this.optionValue]);
      if (i >= 0) {
        this.selected.splice(i, 1);
        this.emmitValue();
      }
    }
  }
  removeOption(event: MouseEvent, index, option: MultiselectInterface) {
    event.stopPropagation();
    this.selected.splice(index, 1);
    this.filteredItems.forEach(item => item.value === option[this.optionValue] ? item.selected = false : {});
    this.emmitValue();
  }

  ngOnInit(): void {
    this.checkRequiredFields('optionValue');
    this.checkRequiredFields('optionLabel');
    this.inputOptions = this.mapInputs();
    this.assignCopy();
  }

  checkRequiredFields(input) {
    if (!this[input]) {
      throw new Error(`Attribute "${input}" is required`);
    }
  }

}
