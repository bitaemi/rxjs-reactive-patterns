import { TestBed } from '@angular/core/testing';

import { ErrorMessagesService } from './error-messages.service';

describe('ErrorMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrorMessagesService = TestBed.get(ErrorMessagesService);
    expect(service).toBeTruthy();
  });
});
