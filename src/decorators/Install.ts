import { Application } from '#application/Application'
import { ModuleRegistrar, ServiceRegistrar, StateRegistrar, ValueRegistrar } from '#decorators/Registrars'
import { ModuleResolver, ServiceResolver, StateResolver, ValueResolver } from '#decorators/Resolvers'
import { ProviderRegistrar, ProviderResolver } from 'platform'

export const installDecorators = () => {
  Application.container.addRegistrar(ProviderRegistrar)
  Application.container.addRegistrar(ModuleRegistrar)
  Application.container.addRegistrar(ServiceRegistrar)
  Application.container.addRegistrar(StateRegistrar)
  Application.container.addRegistrar(ValueRegistrar)

  Application.container.addResolver(ProviderResolver)
  Application.container.addResolver(ModuleResolver)
  Application.container.addResolver(ServiceResolver)
  Application.container.addResolver(StateResolver)
  Application.container.addResolver(ValueResolver)
}
