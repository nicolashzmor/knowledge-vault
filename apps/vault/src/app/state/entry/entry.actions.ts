import {Repository} from "../../features/git-collector/declarations/repository.class";
import {GitCollectorDeclarations} from "../../features/git-collector/declarations/declarations";

export namespace EntryActions {
  import GitTreeEntry = GitCollectorDeclarations.GitTreeEntry;

  export class LoadEntry {
    public static type = '[DOCUMENT] Load Document'
    constructor(public repository: Repository, public entry: GitTreeEntry) {
    }
  }
}
