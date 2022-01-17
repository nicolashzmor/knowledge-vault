import {Type} from "@angular/core";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DynamicRouterDeclarations {
  export interface IDynamicRoute {
    name: string
    path: string
    component: Type<unknown>
  }

  export interface DynamicRouteDto {
    name: string
    path: string
    component: Type<unknown>
  }
}


