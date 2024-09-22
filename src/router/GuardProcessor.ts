import { Route } from './Route'
import { Router } from './Router'

export class GuardProcessor {
  constructor(private _router: Router) {}

  async canView(route: Route) {
    if (!route.guards || route.guards.length === 0)   return { canView: true, path: '' }

    for (const guard of route.guards) {
      const { canView, path } = await guard.canView(route)
      if (!canView) return { canView, path }
    }

    return { canView: true, path: '' }
  }
}
