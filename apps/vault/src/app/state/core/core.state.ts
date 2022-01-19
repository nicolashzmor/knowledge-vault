import {Action, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {GitCollectorService} from "../../features/git-collector/git-collector.service";
import {DynamicRouterService} from "../../features/dynamic-router/dynamic-router.service";
import {MarkdownReaderService} from "../../features/markdown-reader/markdown-reader.service";
import {catchError, combineLatest, map, switchMap, tap} from "rxjs";
import {CoreActions} from "./core.actions";
import {CoreModels} from "./core.models";
import {CoreEvents} from "./core.events";
import {GitCollectorDeclarations} from "../../features/git-collector/declarations/declarations";
import {DirectoryViewComponent} from "../../pages/directory-view/directory-view.component";
import {DocumentViewComponent} from "../../pages/document-view/document-view.component";
import {DynamicRouterDeclarations} from "../../features/dynamic-router/declarations/declarations";
import {Navigate} from "@ngxs/router-plugin";
import GitTreeEntry = GitCollectorDeclarations.GitTreeEntry;
import DynamicRouteDto = DynamicRouterDeclarations.DynamicRouteDto;

@State<CoreModels.State>({
  name: 'core',
  defaults: {
    loadedTree: [],
    loadedEntries: [],
    routesToEntryDictionary: {},
    repository: '',
    loading: false,
  }
})
@Injectable()
export class CoreState {
  constructor(
    protected gitCollector: GitCollectorService,
    protected dynamicRouter: DynamicRouterService,
    protected markdownReader: MarkdownReaderService
  ) {
  }

  @Action(CoreActions.ConnectRepository)
  onConnectRepository(
    {patchState, dispatch}: StateContext<CoreModels.State>,
    {connection, options}: CoreActions.ConnectRepository
  ) {
    patchState({loading: true, repository: connection.repository})
    return this.gitCollector.connect(connection, options).pipe(
      switchMap((repository) => dispatch(new CoreEvents.RepositoryConnectionSucceeded(repository))),
      catchError(() => dispatch(CoreEvents.RepositoryConnectionFailed))
    )
  }

  @Action(CoreEvents.RepositoryConnectionSucceeded)
  onRepositoryConnectionSucceeded(
    {patchState, dispatch}: StateContext<CoreModels.State>,
    {repository}: CoreEvents.RepositoryConnectionSucceeded
  ) {
    return combineLatest([repository.entriesTree$, repository.entriesFlatMap$])
      .pipe(
        map(([tree, entries]) => ({tree, entries})),
        tap(({tree, entries}) => patchState({
          loading: false,
          loadedTree: tree,
          loadedEntries: entries,
          routesToEntryDictionary: this.generateRoutesToEntryDictionary(entries)
        })),
        tap(({entries}) => dispatch(new CoreActions.RefreshDynamicRoutes(entries.map(this.entryToDynamicRoute))))
      )
  }

  @Action(CoreEvents.RepositoryConnectionFailed)
  onRepositoryConnectionFailed({patchState}: StateContext<CoreModels.State>) {
    patchState({loading: false})
  }

  @Action(CoreActions.RefreshDynamicRoutes)
  onRefreshDynamicRoutes(ctx: StateContext<CoreModels.State>, {routes}: CoreActions.RefreshDynamicRoutes) {
    this.dynamicRouter.refresh(routes)
  }

  @Action(Navigate)
  onNavigate({patchState}: StateContext<CoreModels.State>, action: Navigate) {
    console.log(action.path)
  }

  protected entryToDynamicRoute(entry: GitTreeEntry): DynamicRouteDto {
    return {
      name: entry.filename,
      path: entry.route,
      component: entry.mode === 'directory' ? DirectoryViewComponent : DocumentViewComponent
    }
  }

  protected generateRoutesToEntryDictionary(entries: GitTreeEntry[]): Record<string, GitTreeEntry> {
    return entries.reduce((dictionary, entry) => {
      return {...dictionary, [entry.route]: entry}
    }, {})
  }

}
