import { Container, ProviderClass, Resolver } from 'platform'
import { Application } from '#application/Application'
import { getState } from './State'

export class StateResolver implements Resolver {
  type: string = 'type:state'

  constructor(private _container: Container) {}

  private _proxifyInstance = (instance: any, token: string) => {
    return new Proxy(instance, {
      set: (target, key, newValue, receiver) => {
        const result = Reflect.set(target, key, newValue, receiver)
        Application.eventsState.fire(`onStateChange:${token}`, target)
        Application.eventsState.fire(`onStateChange`, target)
        return result
      },
    })
  }

  resolveSync = <T>(providerClass: ProviderClass<T>): T => {
    const provider = getState(providerClass)

    if (this._container._instances.has(provider.token)) return this._container._instances.get(provider.token)!

    const newInstance = this._container.instanceCreator.createInstance(provider)
    const proxyInstance = this._proxifyInstance(newInstance, provider.token)

    // cache
    this._container._instances.set(provider.token, proxyInstance)

    return proxyInstance
  }
}
