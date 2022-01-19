import {Component} from '@angular/core';
import {GitCollectorDeclarations} from "../../features/git-collector/declarations/declarations";
import {Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {CoreSelectors} from "../../state/core/core.selectors";
import GitTreeEntry = GitCollectorDeclarations.GitTreeEntry;

@Component({
  selector: 'fec-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public entries$: Observable<GitTreeEntry[]> = this.store.select(CoreSelectors.LoadedEntries())

  constructor(protected store: Store) {
  }


}
