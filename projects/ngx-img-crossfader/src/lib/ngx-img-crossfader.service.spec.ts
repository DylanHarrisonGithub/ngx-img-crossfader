import { TestBed } from '@angular/core/testing';

import { NgxImgCrossfaderService } from './ngx-img-crossfader.service';

describe('NgxImgCrossfaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxImgCrossfaderService = TestBed.get(NgxImgCrossfaderService);
    expect(service).toBeTruthy();
  });
});
