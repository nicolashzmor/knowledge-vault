import {MatchedRoute} from "./matched-route.class";
import {DynamicRoute} from "./dynamic-route.class";
import {Component} from "@angular/core";
import {UrlSegment} from "@angular/router";

@Component({template: ''})
export class TestComponent {

}

describe('Matched Dynamic Route', function () {

  let simple_path_route: DynamicRoute
  let route_with_parameters: DynamicRoute

  beforeEach(() => {
    simple_path_route = new DynamicRoute({name: 'SIMPLE_ROUTE', path: 'simple_path', component: TestComponent})
    route_with_parameters = new DynamicRoute({
      name: 'ROUTE_WITH_PARAMETERS',
      path: 'route/with/:params',
      component: TestComponent
    })
  })

  it('should create', () => {
    expect(new MatchedRoute(simple_path_route, [new UrlSegment('simple_path', {})])).toBeTruthy()
  })

  it('should expose the parameters map with [key: value] structure', () => {
    const route = new MatchedRoute(route_with_parameters, [
      new UrlSegment('route', {}),
      new UrlSegment('with', {}),
      new UrlSegment('hello', {})
    ])
    expect(route.paramsMap).toEqual({params: new UrlSegment('hello', {})})
  })
});
