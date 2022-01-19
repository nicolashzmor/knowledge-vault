import {Component} from '@angular/core';
import {GitCollectorDeclarations} from "../../features/git-collector/declarations/declarations";
import {Observable} from "rxjs";
import {Store} from "@ngxs/store";
import {CoreSelectors} from "../../state/core/core.selectors";
import {NestedTreeControl} from "@angular/cdk/tree";
import {ArrayDataSource, DataSource} from "@angular/cdk/collections";
import GitTreeNode = GitCollectorDeclarations.GitTreeNode;

@Component({
  selector: 'fec-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public entries$: Observable<GitTreeNode[]> = this.store.select(CoreSelectors.LoadedEntries())
  public control = new NestedTreeControl<GitTreeNode>(entry => entry.children)
  public dataSource: DataSource<GitTreeNode> = new ArrayDataSource<GitTreeNode>(this.entries$)

  constructor(protected store: Store) {
  }

  isDirectory(index: number, node: GitTreeNode) {
    return node.entry.mode === 'directory'
  }


}
