
import { Container, ProviderClass, Registrar } from 'platform'
import { getService, Service } from './Service'

export class ServiceRegistrar implements Registrar {
  type: string = 'type:service'

  constructor(private _container: Container) {}

  register(providerClass: ProviderClass) {
    const provider = getService(providerClass)

    this._container._providers.set(provider.token, provider)
  }

  registerManual(service: Service): void {
    this._container._providers.set(service.token, service)
  }
}
