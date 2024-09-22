export interface ApplicationEvents {
  onBoot?: any

  onInit?: any

  onStart?: any

  onStop?: any

}

export interface ApplicationEventsState {
  onStateChange: any
  [key: `onStateChange:${string}`]: any
}
