import {createSelector} from "@ngxs/store";
import {CoreModels} from "./core.models";
import {CoreState} from "./core.state";
import {GitCollectorDeclarations} from "../../features/git-collector/declarations/declarations";
import GitTreeNode = GitCollectorDeclarations.GitTreeNode;
import GitTreeEntry = GitCollectorDeclarations.GitTreeEntry;

export class CoreSelectors {
  public static LoadedEntries() {
    return createSelector<(s: CoreModels.State) => GitTreeNode[]>([CoreState], (state) => state.loadedTree)
  }
  public static LoadEntry(path: string){
    return createSelector<(s: CoreModels.State) => GitTreeEntry | undefined>([CoreState], (state) => state.routesToEntryDictionary[path])
  }
}
