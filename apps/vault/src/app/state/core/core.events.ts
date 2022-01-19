import {Repository} from "../../features/git-collector/declarations/repository.class";


export namespace CoreEvents {
  export class RepositoryConnectionSucceeded {
    public static type = '[CORE] Repository Connection Succeeded'
    constructor(public repository: Repository){}
  }
  export class RepositoryConnectionFailed {
    public static type = '[CORE] Repository Connection Failed'
  }
}
