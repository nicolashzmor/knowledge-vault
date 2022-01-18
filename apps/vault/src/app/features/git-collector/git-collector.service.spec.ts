import {TestBed} from '@angular/core/testing';

import {GitCollectorService} from './git-collector.service';
import {MockProvider} from "ng-mocks";
import {GitCollectorValues} from "./declarations/values";
import MODULE_CONFIG = GitCollectorValues.MODULE_CONFIG;

describe('GitCollectorService', () => {
  let service: GitCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MockProvider(MODULE_CONFIG, { connection: { repository: '' }, roots: [] })]
    });
    service = TestBed.inject(GitCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});