import {Injectable} from '@angular/core';
import {MarkdownReaderDeclarations} from "./declarations/declarations";

import {Lexer, Parser} from 'marked'
import LexedMarkdown = MarkdownReaderDeclarations.MarkdownTokens;

@Injectable({
  providedIn: 'root'
})
export class MarkdownReaderService {
  lex(markdown: string): LexedMarkdown {
    return Lexer.lex(markdown)
  }

  parse(lexed: LexedMarkdown){
    return Parser.parse(lexed)
  }
}
