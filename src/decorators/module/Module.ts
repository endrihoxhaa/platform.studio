import { ProviderClass, Provider, getProvider, set, setType, get,  } from 'platform'

export interface Module extends Provider {
  states: ProviderClass[]
  services: ProviderClass[]
  providers: ProviderClass[]
  imports: ProviderClass[]
  apis: ProviderClass[]
}

/**
 * Module Decorator
 */
export const Module = (metadata?: Partial<Module>) => {
  return (target: any) => {
    Provider(metadata)(target)

    setType(target, 'type:module')
    set(target, 'module:states', metadata?.states ?? [])
    set(target, 'module:services', metadata?.services ?? [])
    set(target, 'module:providers', metadata?.providers ?? [])
    set(target, 'module:imports', metadata?.imports ?? [])
    set(target, 'module:apis', metadata?.apis ?? [])
  }
}

/**
 * Module Reader
 */
export const getModule = (providerClass: ProviderClass): Module => {
  return {
    ...getProvider(providerClass),
    states: get(providerClass, 'module:states') ?? [],
    imports: get(providerClass, 'module:imports') ?? [],
    services: get(providerClass, 'module:services') ?? [],
    providers: get(providerClass, 'module:providers') ?? [],
    apis: get(providerClass, 'module:apis') ?? [],
  }
}
