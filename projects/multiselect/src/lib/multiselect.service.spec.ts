import { TestBed } from '@angular/core/testing';

import { MultiselectService } from './multiselect.service';

describe('MultiSelectService', () => {
  let service: MultiselectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiselectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
