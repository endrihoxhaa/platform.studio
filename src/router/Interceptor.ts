import { Route } from './Route'

export interface Interceptor {
  onView(route: Route): void
  onViewMount(route: Route): void
  onViewDestroy(route: Route): void
}
