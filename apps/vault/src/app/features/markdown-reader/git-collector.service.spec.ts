import {TestBed} from '@angular/core/testing';

import {GitCollectorService} from './git-collector.service';
import {MockProvider} from "ng-mocks";
import {ObsidianCollectorValues} from "./declarations/values";
import REPO_CONNECTION = ObsidianCollectorValues.REPO_CONNECTION;

describe('GitCollectorService', () => {
  let service: GitCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(REPO_CONNECTION, { repository: '' })]
    });
    service = TestBed.inject(GitCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
