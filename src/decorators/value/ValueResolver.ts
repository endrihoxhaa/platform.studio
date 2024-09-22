import { Container, getToken, ProviderClass, Resolver } from 'platform'

export class ValueResolver implements Resolver {
  type: string = 'type:value'

  constructor(private _container: Container) {}

  resolveSync = <T>(providerClass: ProviderClass<T>): T => {
    const token = getToken(providerClass)
    const provider = this._container._providers.get(token)!

    if (this._container._instances.has(provider.token)) return this._container._instances.get(provider.token)!

    // const newInstance = this._container.instanceCreator.createInstance(provider)

    // cache
    this._container._instances.set(provider.token, provider.payload)

    return provider.payload
  }
}
