import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import { DirectoryViewComponent } from './directory-view/directory-view.component';
import { DocumentViewComponent } from './document-view/document-view.component';
import { HomeComponent } from './home/home.component';
import {CdkTreeModule} from "@angular/cdk/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    DirectoryViewComponent,
    DocumentViewComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CdkTreeModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PagesModule {
}
