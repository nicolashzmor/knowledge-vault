import {Inject, Injectable} from '@angular/core';
import {ObsidianCollectorValues} from "./declarations/values";
import {MarkdownReaderDeclarations} from "./declarations/declarations";
import * as BrowserFS from 'browserfs';
import * as git from 'isomorphic-git'
import {TREE, WalkerEntry} from 'isomorphic-git'
import * as http from 'isomorphic-git/http/web'
import fs from "browserfs/dist/node/core/node_fs";
import {from, Observable, shareReplay, Subject, switchMap} from "rxjs";
import MODULE_CONFIG = ObsidianCollectorValues.MODULE_CONFIG;
import GitTreeEntry = MarkdownReaderDeclarations.GitTreeEntry;
import GitTreeNode = MarkdownReaderDeclarations.GitTreeNode;

@Injectable({
  providedIn: 'root'
})
export class GitCollectorService {
  protected modesMap: Record<string, string> = {
    '40000': 'directory',
    '100644': 'file',
    '100755': 'executable',
    '120000': 'symlink',
    'unknown': 'unknown'
  }
  protected rootDir!: string;
  protected fs!: typeof fs;
  protected fileSystemReady$: Subject<void> = new Subject()
  protected clone$ = this.fileSystemReady$.pipe(switchMap(() => from(this.cloneRepository())), shareReplay())
  public entriesTree$: Observable<GitTreeNode[]> = this.clone$.pipe(switchMap(() => from(this.buildEntriesTree())), shareReplay())
  public entriesFlatMap$: Observable<GitTreeEntry[]> = this.clone$.pipe(switchMap(() => from(this.buildEntriesFlatMap())), shareReplay())

  constructor(@Inject(MODULE_CONFIG) protected moduleConfig: MarkdownReaderDeclarations.MarkdownReaderModuleConfig) {
    (new Promise((resolve, reject) => {
      BrowserFS.getFileSystem({
        fs: "IndexedDB",
        options: {}
      }, function (error, fs) {
        if (error) {
          BrowserFS.configure({
            fs: "IndexedDB",
            options: {}
          }, function (error) {
            if (error) {
              reject(error)
            }
            BrowserFS.install(window)
            resolve(null)
          })
        }
        if (fs) resolve(BrowserFS.initialize(fs));
      })
    }))
      .then(async () => {
          this.fs = BrowserFS.BFSRequire("fs")
          this.rootDir = '/testing'
          this.fileSystemReady$.next()
        }
      )
  }

  protected cloneRepository() {
    return git.clone({
      fs: this.fs,
      http,
      dir: this.rootDir,
      corsProxy: 'https://cors.isomorphic-git.org',
      url: this.moduleConfig.connection.repository
    })
  }

  protected buildEntriesTree() {
    return git.walk({
      fs: this.fs,
      dir: this.rootDir,
      trees: [TREE({ref: 'HEAD'})],
      map: this.entriesFormatter,
      reduce: async (parent, children) => {
        return {entry: parent, children};
      }
    }).then(results => results.children)
  }

  protected buildEntriesFlatMap() {
    return git.walk({
      fs: this.fs,
      dir: this.rootDir,
      trees: [TREE({ref: 'HEAD'})],
      map: this.entriesFormatter
    })
  }

  protected entriesFormatter = async (filepath: string, entries: (WalkerEntry | null)[]) => {
    const segments = filepath.split('/');
    const root = segments[0]
    const filename = segments[segments.length - 1]
    const entry = entries[0]
    const mode = (await entry?.mode())?.toString(8) || 'unknown';
    return this.moduleConfig.roots.includes(root) || root === '.' ? {
      filepath,
      filename,
      oid: await entry?.oid(),
      type: await entry?.type(),
      mode: this.modesMap[mode]
    } : null;
  }
}
