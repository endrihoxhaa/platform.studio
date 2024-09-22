import { Application } from '#application/Application'
import { ProviderClass } from 'platform'

export const inject = <T>(providerClass: ProviderClass<T>): T => Application.container.resolveSync(providerClass)
