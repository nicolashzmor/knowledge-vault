import {Inject, Injectable, Type} from '@angular/core';
import {DynamicRouterDeclarations} from "./declarations/declarations";
import {DynamicRouterValues} from "./declarations/values";
import {DynamicRouter} from "./declarations/dynamic-router.class";
import * as uuid from 'uuid';
import DynamicRouteDto = DynamicRouterDeclarations.DynamicRouteDto;
import INITIAL_ROUTES = DynamicRouterValues.INITIAL_ROUTES;

@Injectable({
  providedIn: 'root'
})
export class DynamicRouterService {
  public static DynamicRoutes: Array<DynamicRouteDto> = []

  public static DynamicRouter: DynamicRouter = new DynamicRouter(DynamicRouterService.DynamicRoutes)

  protected static Components: Map<string, Type<unknown>> = new Map();

  constructor(@Inject(INITIAL_ROUTES) protected routes: Array<DynamicRouteDto>) {
    this.update(routes)
  }

  public static RegisterComponent(type: Type<unknown>) {
    const key = uuid.v4();
    DynamicRouterService.Components.set(key, type)
    return key;
  }

  public static GetComponent(key: string) {
    return DynamicRouterService.Components.get(key);
  }

  add(routes: DynamicRouteDto | DynamicRouteDto[]) {
    routes = Array.isArray(routes) ? routes : [routes]
    this.update([...DynamicRouterService.DynamicRoutes, ...routes])
  }

  protected update(routes: DynamicRouteDto[]) {
    DynamicRouterService.DynamicRoutes = routes;
    DynamicRouterService.DynamicRouter = new DynamicRouter(DynamicRouterService.DynamicRoutes)
  }

}
