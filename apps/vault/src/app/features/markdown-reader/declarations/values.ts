import {InjectionToken} from "@angular/core";
import {MarkdownReaderDeclarations} from "./declarations";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MarkdownReaderValues {
  import GitCredentials = MarkdownReaderDeclarations.GitCredentials;
  import ObsidianCollectorModuleConfig = MarkdownReaderDeclarations.MarkdownReaderModuleConfig;
  export const MODULE_CONFIG = new InjectionToken<ObsidianCollectorModuleConfig>('ObsidianCollector:Config')
  export const REPO_CONNECTION = new InjectionToken<GitCredentials>('ObsidianCollector:RepoConnection')
}
