import {TestBed} from '@angular/core/testing';

import {DynamicRouterService} from './dynamic-router.service';
import {DynamicRouterValues} from "./declarations/values";
import INITIAL_ROUTES = DynamicRouterValues.INITIAL_ROUTES;

describe('DynamicRoutesService', () => {
  let service: DynamicRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DynamicRouterService,
        {provide: INITIAL_ROUTES, useValue: []}
      ]
    });
    service = TestBed.inject(DynamicRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should load the initial routes', () => {
    expect(DynamicRouterService.DynamicRoutes).toEqual([])
  })
});
