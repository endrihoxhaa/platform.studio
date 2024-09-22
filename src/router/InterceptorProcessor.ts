import { Router } from './Router'
import { Route } from './Route'

export class InterceptorProcessor {
  constructor(private _router: Router) {}

  async onView(route: Route) {
    for (const interceptor of route.interceptors) {
      interceptor.onView(route)
    }
  }
}
