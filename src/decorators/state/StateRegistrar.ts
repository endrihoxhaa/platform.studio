import { Container, Provider, ProviderClass, Registrar } from 'platform'
import { getState } from './State'

export class StateRegistrar implements Registrar {
  type: string = 'type:state'

  constructor(private _container: Container) {}

  register(providerClass: ProviderClass) {
    const provider = getState(providerClass)
    this._container._providers.set(provider.token, provider)
  }

  registerManual(provider: Provider): void {
    this._container._providers.set(provider.token, provider)
  }
}
