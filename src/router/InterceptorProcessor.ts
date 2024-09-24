import { Router } from './Router'
import { Route } from './Route'
import { Interceptor } from './Interceptor'

export class InterceptorProcessor implements Interceptor {
  constructor(private _router: Router) {}

  async onView(route: Route) {
    if (!route.interceptors || route.interceptors.length === 0) return
    for (const interceptor of route.interceptors) {
      interceptor.onView(route)
    }
  }

  async onViewMount(route: Route) {
    if (!route.interceptors || route.interceptors.length === 0) return
    for (const interceptor of route.interceptors) {
      interceptor.onViewMount(route)
    }
  }

  async onViewDestroy(route: Route) {
    if (!route.interceptors || route.interceptors.length === 0) return
    for (const interceptor of route.interceptors) {
      interceptor.onViewDestroy(route)
    }
  }
}
