import {createSelector} from "@ngxs/store";
import {CoreModels} from "./core.models";
import {CoreState} from "./core.state";
import {GitCollectorDeclarations} from "../../features/git-collector/declarations/declarations";
import GitTreeNode = GitCollectorDeclarations.GitTreeNode;

export class CoreSelectors {
  public static LoadedEntries() {
    return createSelector<(s: CoreModels.State) => GitTreeNode[]>([CoreState], (state) => state.loadedTree)
  }
}
