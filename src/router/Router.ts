import { EventChannel } from 'platform'
import { Route } from './Route'
import { GuardProcessor } from './GuardProcessor'
import { EventListener } from 'platform'
import { InterceptorProcessor } from './InterceptorProcessor'

export const NOT_FOUND_PATH = '/not-found'
export const ACCESS_DENIED_PATH = '/access-denied'

export class Router {
  routes: Map<string, Route>
  channel: EventChannel<Route> = new EventChannel()
  activeRoute!: Route
  guardProcessor: GuardProcessor
  interceptorProcessor: InterceptorProcessor

  constructor() {
    this.routes = new Map()
    this.guardProcessor = new GuardProcessor(this)
    this.interceptorProcessor = new InterceptorProcessor(this)
  }

  // Helper to extract parameters from the URL and match dynamic routes
  private matchRoute(path: string): { route: Route | null; params: Record<string, string> } {
    for (const [routePath, route] of this.routes.entries()) {
      const routeRegex = new RegExp('^' + routePath.replace(/:\w+/g, '([^/]+)') + '$') // Convert :param to a regex
      const match = path.match(routeRegex)

      if (match) {
        const paramNames = (routePath.match(/:(\w+)/g) || []).map((param) => param.slice(1)) // Extract param names
        const paramValues = match.slice(1) // Extract matched values from URL
        const params = paramNames.reduce((acc, paramName, index) => {
          acc[paramName] = paramValues[index]
          return acc
        }, {} as Record<string, string>)

        return { route, params }
      }
    }
    return { route: null, params: {} }
  }

  setNotFound(route: Route) {
    this.routes.set(NOT_FOUND_PATH, route)
  }

  setAccessDenied(route: Route) {
    this.routes.set(ACCESS_DENIED_PATH, route)
  }

  registerRoute(route: Route) {
    if (this.routes.has(route.path)) {
      throw new Error(`Route "${route.path}" is already registered.`)
    }
    this.routes.set(route.path, route)
  }

  registerRoutes(routes: Route[]) {
    routes.forEach((route) => this.registerRoute(route))
  }

  navigate = async (location: string) => {
    const { route, params } = this.matchRoute(location)

    if (!route) {
      const notFoundRoute = this.routes.get(NOT_FOUND_PATH)
      if (notFoundRoute) {
        this.navigate(NOT_FOUND_PATH)
      }
      return console.info('Route Not Found', location)
    }

    const canView = await this.guardProcessor.canView(route)

    if (canView !== true) {
      if (canView.redirectTo) this.navigate(canView.redirectTo)
      return console.info('Access Denied', location)
    }

    // Assign parameters to the route before proceeding
    route.params = params
    route.location = location

    // Call onViewDestroy before mounting a new route
    if (this.activeRoute) {
      this.interceptorProcessor.onViewDestroy(this.activeRoute)
    }

    this.interceptorProcessor.onViewMount(route)

    this.channel.fire(route)

    this.activeRoute = route

    this.interceptorProcessor.onView(route)
  }

  onRoute(listener: EventListener<Route>) {
    return this.channel.on(listener)
  }
}
