import {TestBed} from '@angular/core/testing';

import {MarkdownReaderService} from './markdown-reader.service';
import {MockProvider} from "ng-mocks";
import {GitCollectorService} from "./git-collector.service";
import {Subject} from "rxjs";

describe('ObsidianReaderService', () => {
  let service: MarkdownReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(GitCollectorService, {entriesTree$: new Subject()})]
    });
    service = TestBed.inject(MarkdownReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
