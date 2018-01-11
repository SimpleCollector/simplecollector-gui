import { TestBed, inject } from '@angular/core/testing';

import { CollectorApiService } from './collector-api.service';

describe('CollectorApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectorApiService]
    });
  });

  it('should be created', inject([CollectorApiService], (service: CollectorApiService) => {
    expect(service).toBeTruthy();
  }));
});
