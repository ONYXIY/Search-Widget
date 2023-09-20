import { TestBed } from '@angular/core/testing';

import { CityPickerService } from './city-picker.service';

describe('SityPickerService', () => {
  let service: CityPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
