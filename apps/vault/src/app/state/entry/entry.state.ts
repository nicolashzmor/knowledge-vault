import {Action, State, StateContext} from "@ngxs/store";
import {EntryModels} from "./entry.models";
import {EntryActions} from "./entry.actions";
import {Injectable} from "@angular/core";
import {MarkdownReaderService} from "../../features/markdown-reader/markdown-reader.service";
import LoadEntry = EntryActions.LoadEntry;

@State<EntryModels.State>({
  name: 'document',
  defaults: {}
})
@Injectable()
export class EntryState {

  constructor(protected markdown: MarkdownReaderService) {
  }

  @Action(LoadEntry)
  async onLoadDocument({patchState}: StateContext<EntryModels.State>, {repository, entry}: LoadEntry) {
    const entryFile = await repository.readEntry(entry)
    if (!entryFile) return;
    const tokens = !Array.isArray(entryFile) ? this.markdown.lex(entryFile) : undefined

    patchState({
      entry: entry,
      path: entry.filepath,
      tokens
    })

  }
}
