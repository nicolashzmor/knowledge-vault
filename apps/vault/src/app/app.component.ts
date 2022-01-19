import {Component, OnInit} from '@angular/core';
import {Store} from "@ngxs/store";
import {CoreActions} from "./state/core/core.actions";

@Component({
  selector: 'fec-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(protected store: Store) {
  }
  ngOnInit(){
    this.store.dispatch(new CoreActions.ConnectRepository(
      {repository: 'https://github.com/nicolashzmor/knowledge-garden.git'},
      {roots: ['🌳 The Forest', '📚 Sources']}
    ))
  }
}
