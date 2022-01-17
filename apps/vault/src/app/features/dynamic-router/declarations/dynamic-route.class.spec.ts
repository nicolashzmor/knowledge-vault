import {DynamicRoute} from "./dynamic-route.class";
import {MatchedRoute} from "./matched-route.class";
import {UrlSegment} from "@angular/router";
import {Component} from "@angular/core";

@Component({ template: ''})
class TestComponent {}

describe('Dynamic Route', function () {

  let simple_path_route: DynamicRoute
  let empty_path_route: DynamicRoute

  beforeEach(() => {
    simple_path_route = new DynamicRoute({name: 'SIMPLE_ROUTE', path: 'simple_path', component: TestComponent})
    empty_path_route = new DynamicRoute({ name: 'EMPTY_ROUTE', path: '', component: TestComponent })
  })

  it('should create', () => {
    expect(simple_path_route).toBeTruthy()
  })

  it('should return the matched route if matches the pattern', () => {
    expect(simple_path_route.matches([new UrlSegment('simple_path', {})])).toBeInstanceOf(MatchedRoute)
  })

  it('should return false if route doesn\'t match', () => {
    expect(simple_path_route.matches([new UrlSegment('hello', {}), new UrlSegment('you', {})])).toBe(false)
    expect(simple_path_route.matches([new UrlSegment('hello', {})])).toBe(false)
  })

  it('should return true when matched "" pattern ', () => {
    expect(empty_path_route.matches([])).toBeInstanceOf(MatchedRoute)
  })

});
