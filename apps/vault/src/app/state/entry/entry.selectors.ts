import {createSelector} from "@ngxs/store";
import {EntryState} from "./entry.state";
import {EntryModels} from "./entry.models";
import {MarkdownReaderDeclarations} from "../../features/markdown-reader/declarations/declarations";
import MarkdownTokens = MarkdownReaderDeclarations.MarkdownTokens;

export class EntrySelectors {
  public static CurrentEntryTokens(){
    return createSelector<(state: EntryModels.State) => MarkdownTokens>([EntryState], (state) => state.tokens || [])
  }
}
