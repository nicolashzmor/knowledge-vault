import {GitCollectorDeclarations} from "../../features/git-collector/declarations/declarations";
import {DynamicRouterDeclarations} from "../../features/dynamic-router/declarations/declarations";

export namespace CoreActions {
  import GitConnectionConfig = GitCollectorDeclarations.GitConnectionConfig;
  import GitConnectionOptions = GitCollectorDeclarations.GitConnectionOptions;
  import DynamicRouteDto = DynamicRouterDeclarations.DynamicRouteDto;

  export class ConnectRepository {
    public static type = '[CORE] Connect Repository'

    constructor(public connection: GitConnectionConfig, public options: GitConnectionOptions) {
    }
  }

  export class RefreshDynamicRoutes {
    public static type = '[CORE] Refresh Dynamic Routes'

    constructor(public routes: DynamicRouteDto[]) {
    }
  }
}
