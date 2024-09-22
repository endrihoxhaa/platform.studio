import { EventChannel } from 'platform'
import { Route } from './Route'
import { GuardProcessor } from './GuardProcessor'
import { EventListener } from 'platform'
import { InterceptorProcessor } from './InterceptorProcessor'

export class Router {
  routes: Map<string, Route>
  channel: EventChannel<Route> = new EventChannel()
  guardProcessor: GuardProcessor
  interceptorProcessor: InterceptorProcessor

  constructor() {
    this.routes = new Map()
    this.guardProcessor = new GuardProcessor(this)
    this.interceptorProcessor = new InterceptorProcessor(this)
  }

  registerRoute(route: Route) {
    if (this.routes.has(route.route)) return console.error('Route Alredy Registered')
    this.routes.set(route.route, route)
  }

  async goTo(path: string) {
    const route = this.routes.get(path)
    if (!route) {
      return false
    }

    const { canView, path: goPath } = await this.guardProcessor.canView(route)

    if (!canView) {
      this.goTo(goPath)
      return false
    }

    this.channel.fire(route)

    this.interceptorProcessor.onView(route)
  }

  onRoute(listener: EventListener<Route>) {
    return this.channel.on(listener)
  }
}
