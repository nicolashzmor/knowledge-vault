import {Type} from "@angular/core";


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


