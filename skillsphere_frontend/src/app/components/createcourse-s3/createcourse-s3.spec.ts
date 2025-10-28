import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecourseS3 } from './createcourse-s3';

describe('CreatecourseS3', () => {
  let component: CreatecourseS3;
  let fixture: ComponentFixture<CreatecourseS3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatecourseS3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatecourseS3);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
