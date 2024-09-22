import { Container, ProviderClass, Registrar } from 'platform'
import { getModule, Module } from './Module'

export class ModuleRegistrar implements Registrar {
  type: string = 'type:module'

  constructor(private _container: Container) {}

  register(providerClass: ProviderClass) {
    const module = getModule(providerClass)

    this._container.registerAll([...module.apis, ...module.imports, ...module.providers, ...module.services, ...module.states])

    this._container._providers.set(module.token, module)
  }

  registerManual(module: Module): void {
    this._container.registerAll([...module.apis, ...module.imports, ...module.providers, ...module.services, ...module.states])

    this._container._providers.set(module.token, module)
  }
}
