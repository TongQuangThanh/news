/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SourceService } from './source.service';

describe('Service: Source', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SourceService]
    });
  });

  it('should ...', inject([SourceService], (service: SourceService) => {
    expect(service).toBeTruthy();
  }));
});
