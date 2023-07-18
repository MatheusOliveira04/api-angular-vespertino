import { TestBed } from '@angular/core/testing';

import { SpeedwayService } from './speedway.service';

describe('SpeedwayService', () => {
  let service: SpeedwayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeedwayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
