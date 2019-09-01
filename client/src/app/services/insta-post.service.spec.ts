import { TestBed } from '@angular/core/testing';

import { InstaPostService } from './insta-post.service';

describe('InstaPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstaPostService = TestBed.get(InstaPostService);
    expect(service).toBeTruthy();
  });
});
