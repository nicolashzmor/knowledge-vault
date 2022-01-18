import { TestBed } from '@angular/core/testing';

import { MarkdownReaderService } from './markdown-reader.service';

describe('ObsidianReaderService', () => {
  let service: MarkdownReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkdownReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
