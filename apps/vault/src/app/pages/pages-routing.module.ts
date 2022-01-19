import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DynamicRoutesMatcher} from "../features/dynamic-router/dynamic-router.matcher";
import {
  DynamicRouterOutletComponent
} from "../features/dynamic-router/dynamic-router-outlet/dynamic-router-outlet.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  {matcher: DynamicRoutesMatcher, component: DynamicRouterOutletComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {

}
