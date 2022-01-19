import {TestBed} from '@angular/core/testing';

import {GitCollectorService} from './git-collector.service';
import 'fake-indexeddb/auto';

describe('GitCollectorService', () => {
  let service: GitCollectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GitCollectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a Repository when connected', () => {
    // TODO: Fix tests. It seems that testing is broken on infrastructure requirements.
    // service.connect({ repository: 'https://github.com/facebook/react' }, { roots: [], identifier: 'testing-repo' }).subscribe(repository => {
    //   expect(repository).toBeInstanceOf(Repository)
    //   done()
    // })
  })
});
