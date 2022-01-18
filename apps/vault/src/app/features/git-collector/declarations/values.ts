import {InjectionToken} from "@angular/core";
import {GitCollectorDeclarations} from "./declarations";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GitCollectorValues {
  import GitCredentials = GitCollectorDeclarations.GitCredentials;
  import GitCollectorConfig = GitCollectorDeclarations.GitCollectorConfig;
  export const MODULE_CONFIG = new InjectionToken<GitCollectorConfig>('ObsidianCollector:Config')
  export const REPO_CONNECTION = new InjectionToken<GitCredentials>('ObsidianCollector:RepoConnection')
}
