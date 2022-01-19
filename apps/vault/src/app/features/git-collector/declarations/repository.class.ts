import fs from "browserfs/dist/node/core/node_fs";
import * as uuid from 'uuid';
import {from, Observable} from "rxjs";
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {GitCollectorDeclarations} from "./declarations";
import * as git from "isomorphic-git";
import {TREE, WalkerEntry} from "isomorphic-git";
import * as http from "isomorphic-git/http/web";
import {GitCollectorValues} from "./values";
import GitTreeNode = GitCollectorDeclarations.GitTreeNode;
import GitTreeEntry = GitCollectorDeclarations.GitTreeEntry;
import GitConnectionConfig = GitCollectorDeclarations.GitConnectionConfig;
import GitConnectionOptions = GitCollectorDeclarations.GitConnectionOptions;
import ENTRY_MODE = GitCollectorValues.ENTRY_MODE;

export class Repository {
  public entriesTree$: Observable<GitTreeNode[]>
  public entriesFlatMap$: Observable<GitTreeEntry[]>
  protected rootDir: string;
  protected clone$: Observable<void>

  constructor(protected filesystem: typeof fs, protected connection: GitConnectionConfig, protected options: GitConnectionOptions) {
    this.rootDir = `/${options.identifier || uuid.v4()}`;
    this.clone$ = from(this.cloneRepository());
    this.entriesTree$ = this.clone$.pipe(switchMap(() => this.buildEntriesTree()), shareReplay())
    this.entriesFlatMap$ = this.clone$.pipe(switchMap(() => this.buildEntriesFlatMap()), shareReplay())
  }

  public connect(): Observable<Repository> {
    return this.clone$.pipe(map(() => this));
  }

  public readEntry(entry: GitTreeEntry): Promise<string[] | string | undefined> {
    // TODO: Abstract this into Entry Mode Processor Dictionary
    if (entry.mode === ENTRY_MODE['40000']) {
      return new Promise((resolve) => {
        this.filesystem.readdir(this.filepath(entry), (err, result) => {
          if (err) throw err;
          resolve(result)
        })
      })
    } else {
      return new Promise((resolve) => {
        this.filesystem.readFile(this.filepath(entry), (err, result) => {
          if (err) throw err;
          resolve(result?.toString())
        })
      })
    }
  }

  protected filepath(entry: GitTreeEntry) {
    return `${this.rootDir}/${entry.filepath}`;
  }

  protected cloneRepository() {
    return git.clone({
      fs: this.filesystem,
      http,
      dir: this.rootDir,
      corsProxy: 'https://cors.isomorphic-git.org',
      url: this.connection.repository
    })
  }

  protected buildEntriesTree() {
    return from(git.walk({
      fs: this.filesystem,
      dir: this.rootDir,
      trees: [TREE({ref: 'HEAD'})],
      map: this.entriesFormatter,
      reduce: async (parent, children) => {
        return {entry: parent, children};
      }
    })).pipe(map(results => results.children))
  }

  protected buildEntriesFlatMap() {
    return from(git.walk({
      fs: this.filesystem,
      dir: this.rootDir,
      trees: [TREE({ref: 'HEAD'})],
      map: this.entriesFormatter
    })).pipe(map((entries: GitTreeEntry[]) => entries.slice(1)))
  }

  protected entriesFormatter = async (filepath: string, entries: (WalkerEntry | null)[]) => {
    const segments = filepath.split('/');
    const route = this.sanitizeRoute(segments)
    const root = segments[0]
    const filename = segments[segments.length - 1]
    const entry = entries[0]
    const mode = (await entry?.mode())?.toString(8) || 'unknown';
    return this.options.roots.includes(root) || root === '.' ? {
      filepath,
      route,
      filename,
      oid: await entry?.oid(),
      type: await entry?.type(),
      mode: (ENTRY_MODE as Record<string, string>)[mode]
    } : null;
  }

  protected sanitizeRoute(segments: string[]) {
    return segments.map(segment => this.sanitizeRouteSegment(segment)).join('/')
  }

  protected sanitizeRouteSegment(segment: string) {
    return segment
      .replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '')
      .replace(/(.md)$/g, '')
      .replace(/[&/\\#,+()$~%.'":*?<>{}]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase()
  }
}
