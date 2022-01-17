import {UrlSegment} from '@angular/router';
import {DynamicRoute} from "./dynamic-route.class";
import {DynamicRouterDeclarations} from "./declarations";
import {MatchedRoute} from "./matched-route.class";
import DynamicRouteDto = DynamicRouterDeclarations.DynamicRouteDto;

export class DynamicRouter {
  protected routes: Array<DynamicRoute>

  constructor(routes: Array<DynamicRouteDto> = []) {
    this.routes = routes.map(r => new DynamicRoute(r));
  }

  match(url: UrlSegment[]): MatchedRoute | false {
    return this.routes.find((route) => route.matches(url))?.matched(url) || false;
  }
}
