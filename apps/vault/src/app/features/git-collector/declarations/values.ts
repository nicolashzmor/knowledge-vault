import {InjectionToken} from "@angular/core";
import {GitCollectorDeclarations} from "./declarations";


export namespace GitCollectorValues {
  import GitCredentials = GitCollectorDeclarations.GitConnectionConfig;
  import GitCollectorConfig = GitCollectorDeclarations.GitCollectorConfig;
  export const MODULE_CONFIG = new InjectionToken<GitCollectorConfig>('ObsidianCollector:Config')
  export const REPO_CONNECTION = new InjectionToken<GitCredentials>('ObsidianCollector:RepoConnection')

  export const ENTRY_MODE = {
    '40000': 'directory',
    '100644': 'file',
    '100755': 'executable',
    '120000': 'symlink',
    'unknown': 'unknown'
  }
}
