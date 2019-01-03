import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailHeaderComponent } from './course-detail-header.component';

describe('CourseDetailHeaderComponent', () => {
  let component: CourseDetailHeaderComponent;
  let fixture: ComponentFixture<CourseDetailHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseDetailHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
