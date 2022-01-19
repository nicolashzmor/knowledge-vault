import {createSelector} from "@ngxs/store";
import {CoreModels} from "./core.models";
import {CoreState} from "./core.state";
import {GitCollectorDeclarations} from "../../features/git-collector/declarations/declarations";
import GitTreeEntry = GitCollectorDeclarations.GitTreeEntry;

export class CoreSelectors {
  public static LoadedEntries() {
    return createSelector<(s: CoreModels.State) => GitTreeEntry[]>([CoreState], (state) => state.loadedEntries)
  }
}
