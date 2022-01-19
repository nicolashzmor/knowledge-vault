import {Injectable} from '@angular/core';
import {GitCollectorDeclarations} from "./declarations/declarations";
import * as BrowserFS from 'browserfs';
import fs from "browserfs/dist/node/core/node_fs";
import {from, map, Observable, switchMap} from "rxjs";
import {Repository} from "./declarations/repository.class";
import GitConnectionConfig = GitCollectorDeclarations.GitConnectionConfig;
import GitConnectionOptions = GitCollectorDeclarations.GitConnectionOptions;
import FSModule = GitCollectorDeclarations.FSModule;

@Injectable({
  providedIn: 'root'
})
export class GitCollectorService {

  protected rootDir!: string;
  protected fs!: typeof fs;

  protected fileSystemReady$: Observable<FSModule> = this.initializeFileSystem()

  public connect(connection: GitConnectionConfig, options: GitConnectionOptions): Observable<Repository> {
    return this.fileSystemReady$.pipe(
      switchMap((fs) => new Repository(fs, connection, options).connect())
    )
  }

  protected initializeFileSystem() {
    return from(new Promise((resolve, reject) => {
      BrowserFS.getFileSystem({
        fs: "IndexedDB",
        options: {}
      }, async (error, fs) => {
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
        if (fs) {
          await BrowserFS.initialize(fs)
          resolve(null)
        }
      })
    })).pipe(map(() => BrowserFS.BFSRequire("fs")))
  }
}
