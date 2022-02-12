import { TestBed } from '@angular/core/testing';

import { CreateAccessTokenService } from './create-access-token.service';

describe('CreateAccessTokenService', () => {
  let service: CreateAccessTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAccessTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
