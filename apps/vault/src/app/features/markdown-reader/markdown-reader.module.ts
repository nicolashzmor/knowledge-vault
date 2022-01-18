import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MarkdownReaderDeclarations} from "./declarations/declarations";
import {ObsidianCollectorValues} from "./declarations/values";
import {MarkdownReaderService} from "./markdown-reader.service";
import ObsidianCollectorModuleConfig = MarkdownReaderDeclarations.MarkdownReaderModuleConfig;
import MODULE_CONFIG = ObsidianCollectorValues.MODULE_CONFIG;


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],

})
export class MarkdownReaderModule {
  constructor(protected obsidian: MarkdownReaderService) {

  }

  public static forRoot(config: ObsidianCollectorModuleConfig): ModuleWithProviders<MarkdownReaderModule> {
    return {
      ngModule: MarkdownReaderModule,
      providers: [
        {provide: MODULE_CONFIG, useValue: config}
      ]
    }
  }
}
