import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DynamicRoutesMatcher} from "../features/dynamic-router/dynamic-router.matcher";
import {
  DynamicRouterOutletComponent
} from "../features/dynamic-router/dynamic-router-outlet/dynamic-router-outlet.component";

const routes: Routes = [
  {matcher: DynamicRoutesMatcher, component: DynamicRouterOutletComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {

}
