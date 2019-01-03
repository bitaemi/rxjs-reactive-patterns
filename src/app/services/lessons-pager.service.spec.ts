import { TestBed, inject } from '@angular/core/testing';

import { LessonsPagerService } from './lessons-pager.service';

describe('LessonsPagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LessonsPagerService]
    });
  });

  it('should be created', inject([LessonsPagerService], (service: LessonsPagerService) => {
    expect(service).toBeTruthy();
  }));
});
