import {marked} from "marked";

export namespace MarkdownReaderDeclarations {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  import Token = marked.Token;
  import TokensList = marked.TokensList;
  export type MarkdownTokens = TokensList | Token[]
}
