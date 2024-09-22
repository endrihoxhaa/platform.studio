import { View } from "#view/View"
import { Guard } from "./Guard"
import { Interceptor } from "./Interceptor"

export interface Route {
  route: string
  guards: Guard[]
  interceptors: Interceptor[]
  view: View
}
