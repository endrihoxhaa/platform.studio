import { Container } from '#container/Container'
import { Resolver } from '#container/Resolver'
import { ProviderClass } from '#provider/Provider'
import { getModule } from './Module'

export class ModuleResolver implements Resolver {
  type: string = 'type:module'

  constructor(private _container: Container) {}

  resolveSync = <T>(providerClass: ProviderClass<T>): T => {
    const module = getModule(providerClass)
    
    if (this._container._instances.has(module.token)) return this._container._instances.get(module.token)!

    const moduleDeclarations = [...module.apis ,...module.imports, ...module.providers, ...module.services, ...module.states]

    this._container.resolveSyncAll(moduleDeclarations)

    const newInstance = this._container.instanceCreator.createInstance(module)

    // cache
    this._container._instances.set(module.token, newInstance)

    return newInstance
  }
}
