import {DynamicRouterDeclarations} from "./declarations";
import {Type} from "@angular/core";
import {DynamicRoute} from "./dynamic-route.class";
import IDynamicRoute = DynamicRouterDeclarations.IDynamicRoute;
import {UrlSegment} from "@angular/router";

export class MatchedRoute implements IDynamicRoute {
  path: string;
  name: string;
  component: Type<unknown>
  paramsMap: Record<string, UrlSegment>;

  constructor(origin: DynamicRoute, matched: UrlSegment[]) {
    this.path = origin.path
    this.name = origin.name
    this.component = origin.component
    this.paramsMap = this.buildParamsMap(matched)
  }

  public buildParamsMap(segments: UrlSegment[]) {
    return this.path.split('/').reduce((map, key, position) => {
      return key.startsWith(':') ? {...map, [key.replace(/^:/, '')]: new UrlSegment(segments[position].path, {})} : map
    }, {})
  }
}
