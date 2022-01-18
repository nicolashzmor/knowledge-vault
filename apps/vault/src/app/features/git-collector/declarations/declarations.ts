// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace GitCollectorDeclarations {
  export type GitCollectorConfig = {
    connection: GitCredentials
    roots: string[]
  };
  export interface GitCredentials {
    repository: string
    username?: string
    password?: string
  }
  export interface GitTreeNode {
    entry: GitTreeEntry
    children: GitTreeNode[]
  }
  export interface GitTreeEntry {
    filepath: string,
    filename: string,
    oid: string,
    type: string,
    mode: string
  }
}
