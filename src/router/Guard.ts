import { Route } from './Route'

export interface Guard {
  canView(route: Route): Promise<{ canView: boolean; path: string }>
}
