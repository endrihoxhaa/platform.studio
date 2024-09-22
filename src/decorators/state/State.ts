import { getProvider, Provider, ProviderClass,setType } from 'platform'

export interface State extends Provider {}

/**
 * State Decorator
 */
export const State = (metadata?: Partial<State>) => {
  return (target: any) => {
    Provider(metadata)(target)

    setType(target, 'type:state')
  }
}

/**
 * State Reader
 */
export const getState = (providerClass: ProviderClass): State => {
  return {
    ...getProvider(providerClass),
  }
}
