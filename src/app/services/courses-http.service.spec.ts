import { TestBed, inject } from '@angular/core/testing';

import { CoursesHttpService } from './courses-http.service';

describe('CoursesHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesHttpService]
    });
  });

  it('should ...', inject([CoursesHttpService], (service: CoursesHttpService) => {
    expect(service).toBeTruthy();
  }));
});
