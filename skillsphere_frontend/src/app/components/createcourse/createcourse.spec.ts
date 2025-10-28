import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createcourse } from './createcourse';

describe('Createcourse', () => {
  let component: Createcourse;
  let fixture: ComponentFixture<Createcourse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createcourse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Createcourse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
