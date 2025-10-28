import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mycoursedetails } from './mycoursedetails';

describe('Mycoursedetails', () => {
  let component: Mycoursedetails;
  let fixture: ComponentFixture<Mycoursedetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mycoursedetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mycoursedetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
