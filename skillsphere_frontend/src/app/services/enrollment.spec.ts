import { TestBed } from '@angular/core/testing';

import { EnrollmentService } from './enrollmentservice.service';

describe('Enrollment', () => {
  let service: EnrollmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
