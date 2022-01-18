import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GitCollectorDeclarations} from "./declarations/declarations";
import GitCollectorConfig = GitCollectorDeclarations.GitCollectorConfig;
import {GitCollectorValues} from "./declarations/values";
import MODULE_CONFIG = GitCollectorValues.MODULE_CONFIG;
import {GitCollectorService} from "./git-collector.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GitCollectorModule {
  constructor(protected collector: GitCollectorService) {
  }

  public static forRoot(config: GitCollectorConfig): ModuleWithProviders<GitCollectorModule> {
    return {
      ngModule: GitCollectorModule,
      providers: [
        {provide: MODULE_CONFIG, useValue: config}
      ]
    }
  }
}
