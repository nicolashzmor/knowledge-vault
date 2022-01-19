import {GitCollectorDeclarations} from "../../features/git-collector/declarations/declarations";


export namespace CoreModels {
  import GitTreeNode = GitCollectorDeclarations.GitTreeNode;
  import GitTreeEntry = GitCollectorDeclarations.GitTreeEntry;

  export interface State {
    repository: string;
    loadedTree: GitTreeNode[]
    loadedEntries: GitTreeEntry[]
    loading: boolean
    routesToEntryDictionary: Record<string, GitTreeEntry>
  }
}
