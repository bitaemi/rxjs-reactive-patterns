import { TestBed, inject } from '@angular/core/testing';

import { NewsletterService } from './newsletter.service';

describe('NewsletterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewsletterService]
    });
  });

  it('should ...', inject([NewsletterService], (service: NewsletterService) => {
    expect(service).toBeTruthy();
  }));
});
