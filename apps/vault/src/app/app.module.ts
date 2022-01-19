import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app.routing.module";
import {DynamicRouterModule} from "./features/dynamic-router/dynamic-router.module";
import {NgxsModule} from "@ngxs/store";
import {CoreState} from "./state/core/core.state";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxsRouterPluginModule} from "@ngxs/router-plugin";
import {EntryState} from "./state/entry/entry.state";


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicRouterModule.forRoot(),
    NgxsModule.forRoot([CoreState, EntryState], {developmentMode: !environment.production}),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
