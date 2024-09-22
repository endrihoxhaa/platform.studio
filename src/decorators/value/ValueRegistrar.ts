import { Container, Provider, ProviderClass, Registrar } from 'platform'
import { getValue } from './Value'

export class ValueRegistrar implements Registrar {
  type: string = 'type:value'

  constructor(private _container: Container) {}

  register(providerClass: ProviderClass) {
    const provider = getValue(providerClass)

    this._container._providers.set(provider.token, provider)
  }

  registerManual(provider: Provider): void {
    this._container._providers.set(provider.token, provider)
  }
}
