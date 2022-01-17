import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicRouterValues} from "./declarations/values";
import {DynamicRouterDeclarations} from "./declarations/declarations";
import { DynamicRouterOutletComponent } from './dynamic-router-outlet/dynamic-router-outlet.component';
import INITIAL_ROUTES = DynamicRouterValues.INITIAL_ROUTES;
import DynamicRouteDto = DynamicRouterDeclarations.DynamicRouteDto;
import {DynamicRouterService} from "./dynamic-router.service";


@NgModule({
  declarations: [
    DynamicRouterOutletComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DynamicRouterModule {
  constructor(protected router: DynamicRouterService) {
  }
  public static forRoot(config: { routes: DynamicRouteDto[] }): ModuleWithProviders<DynamicRouterModule> {
    return {
      ngModule: DynamicRouterModule,
      providers: [
        { provide: INITIAL_ROUTES, useValue: config.routes }
      ]
    }
  }
}
