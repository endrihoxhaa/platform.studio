import { getProvider, Provider, ProviderClass, setType } from 'platform'

export interface Value extends Provider {}

/**
 * Value Decorator
 */
export const Value = (metadata?: Partial<Value>) => {
  return (target: any) => {
    Provider(metadata)(target)

    setType(target, 'type:value')
  }
}

/**
 * Value Reader
 */
export const getValue = (providerClass: ProviderClass): Value => {
  return {
    ...getProvider(providerClass),
  }
}
