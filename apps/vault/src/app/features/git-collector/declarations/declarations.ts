import fs from "browserfs/dist/node/core/node_fs";


export namespace GitCollectorDeclarations {

  export type FSModule = typeof fs;

  export type GitCollectorConfig = {
    connection: GitConnectionConfig
    roots: string[]
  };

  export interface GitConnectionConfig {
    repository: string
    username?: string
    password?: string
  }
  export interface GitConnectionOptions {
    roots: string[]
    identifier?: string;
    filesystem?: 'LocalStorage' | 'IndexedDB'
  }

  export interface GitTreeNode {
    entry: GitTreeEntry
    children: GitTreeNode[]
  }

  export interface GitTreeEntry {
    filepath: string,
    filename: string,
    route: string,
    oid: string,
    type: string,
    mode: string
  }


}
