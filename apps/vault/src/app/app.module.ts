import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app.routing.module";
import {DynamicRouterModule} from "./features/dynamic-router/dynamic-router.module";
import {VaultPageComponent} from "./pages/vault-page/vault-page.component";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicRouterModule.forRoot({
      routes: [{path: '', name: 'INITIAL_PAGE', component: VaultPageComponent}]
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
