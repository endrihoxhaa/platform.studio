import { Route } from './Route'

export interface Interceptor {
  onView(route: Route): void
}
