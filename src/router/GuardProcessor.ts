import { Route } from './Route'
import { Router } from './Router'

export class GuardProcessor {
  constructor(private _router: Router) {}

  async canView(route: Route) {
    if (!route.guards || route.guards.length === 0) return true

    for (const guard of route.guards) {
      const canView = await guard.canView(route)
      if (!canView) return guard
    }

    return true
  }
}
