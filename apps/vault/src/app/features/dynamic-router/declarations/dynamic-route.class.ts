import {DynamicRouterDeclarations} from "./declarations";
import {MatchedRoute} from "./matched-route.class";
import {UrlSegment} from "@angular/router";
import DynamicRouteDto = DynamicRouterDeclarations.DynamicRouteDto;
import IDynamicRoute = DynamicRouterDeclarations.IDynamicRoute;
import {Type} from "@angular/core";

export class DynamicRoute implements IDynamicRoute {
  public name: string;
  public path: string;
  public component: Type<unknown>;
  protected pattern: Array<string>;
  protected parameters: Array<string>;

  constructor(routeDef: DynamicRouteDto) {
    this.name = routeDef.name
    this.path = this.sanitizePattern(routeDef.path)
    this.component = routeDef.component
    this.pattern = this.path.split('/')
    this.parameters = this.pattern.filter(p => p.startsWith(':')).map(segment => segment.replace(/^:/, ""))
  }

  matches(path: UrlSegment[]): MatchedRoute | false {
    path = (path.length === 0) ? [new UrlSegment('', {})] : path
    return this.matchPattern(path) ? new MatchedRoute(this, path) : false;
  }

  matched(path: UrlSegment[]): MatchedRoute {
    return new MatchedRoute(this, path)
  }

  protected matchPattern(segments: UrlSegment[]) {
    let matched = false;

    if (segments.length !== this.pattern.length) return false;

    for (const index in this.pattern) {
      matched = this.pattern[index].startsWith(':') || this.pattern[index] === segments[index].path
      if (!matched) break;
    }

    return matched
  }

  protected sanitizePattern(path: string): string {
    return path
      .replace(/^\/+/, '') // Remove backslashes at start
      .replace(/\/$/, '') // Remove backslashes at end
  }

}
