import { Injectable } from '@angular/core';
import {GitCollectorService} from "./git-collector.service";

@Injectable({
  providedIn: 'root'
})
export class MarkdownReaderService {
  protected tree$ = this.repository.entriesTree$
  constructor(protected repository: GitCollectorService) {
    this.tree$.subscribe(tree => console.log(tree))
  }
}
