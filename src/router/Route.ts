import { View } from "#view/View"
import { Guard } from "./Guard"
import { Interceptor } from "./Interceptor"

export interface Route {
  path: string
  location?: string
  guards?: Guard[]
  interceptors?: Interceptor[]
  view: View
  params?: Record<string, string>
}
