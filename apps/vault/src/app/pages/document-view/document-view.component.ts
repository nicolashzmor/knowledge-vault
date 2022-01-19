import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Store} from "@ngxs/store";
import {EntrySelectors} from "../../state/entry/entry.selectors";
import {MarkdownReaderService} from "../../features/markdown-reader/markdown-reader.service";
import {filter, map, Observable} from "rxjs";
import {MarkdownReaderDeclarations} from "../../features/markdown-reader/declarations/declarations";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import MarkdownTokens = MarkdownReaderDeclarations.MarkdownTokens;

@Component({
  selector: 'fec-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentViewComponent {
  tokens$ = this.store.select(EntrySelectors.CurrentEntryTokens()).pipe(filter((tokens) => !!tokens && tokens.length > 0))
  parsed$: Observable<SafeHtml> = this.tokens$.pipe(map((tokens: MarkdownTokens) => this.sanitizer.bypassSecurityTrustHtml(this.markdown.parse(tokens))))

  constructor(
    protected store: Store,
    protected markdown: MarkdownReaderService,
    protected sanitizer: DomSanitizer
  ) {

  }

}
