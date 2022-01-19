import {GitCollectorDeclarations} from "../../features/git-collector/declarations/declarations";
import {MarkdownReaderDeclarations} from "../../features/markdown-reader/declarations/declarations";

export namespace EntryModels {
  import GitTreeEntry = GitCollectorDeclarations.GitTreeEntry;
  import MarkdownTokens = MarkdownReaderDeclarations.MarkdownTokens;

  export interface State {
    path?: string
    entry?: GitTreeEntry
    tokens?: MarkdownTokens
  }
}
