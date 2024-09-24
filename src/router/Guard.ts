import { Route } from './Route'

export interface Guard {
  redirectTo: string | null
  canView(route: Route): Promise<boolean>
}
