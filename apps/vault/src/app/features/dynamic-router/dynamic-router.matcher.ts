import {UrlMatcher, UrlSegment} from "@angular/router";
import {DynamicRouterService} from "./dynamic-router.service";

export const DynamicRoutesMatcher: UrlMatcher = (url, group) => {
  const matched = DynamicRouterService.DynamicRouter.match(group.segments)
  if (matched) {
    const component_key = DynamicRouterService.RegisterComponent(matched.component)
    return (matched && {
      consumed: url,
      posParams: {
        component: new UrlSegment(component_key, {}),
        ...matched.paramsMap
      }
    }) || null;
  }
  return null;

}
