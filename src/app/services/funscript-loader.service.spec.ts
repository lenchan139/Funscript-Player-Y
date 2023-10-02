import { TestBed } from '@angular/core/testing';

import { FunscriptLoaderService } from './funscript-loader.service';

describe('FunscriptLoaderService', () => {
  let service: FunscriptLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunscriptLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
