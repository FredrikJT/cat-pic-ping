import { TestBed } from '@angular/core/testing';

import { GetCatService } from './get-cat.service';

describe('GetCatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetCatService = TestBed.get(GetCatService);
    expect(service).toBeTruthy();
  });
});
