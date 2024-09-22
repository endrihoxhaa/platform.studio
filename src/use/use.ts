import { Application } from '#application/Application'
import { ProviderClass } from 'platform'
import { useEffect, useState } from 'react'

export const use = <T>(providerClass: ProviderClass<T>): T => {
  const [instance, setInstance] = useState(Application.container.resolveSync(providerClass))
  const [state, setState] = useState(JSON.stringify(Application.container.resolveSync(providerClass)))

  const handleUpdate = (updatedInstance: any) => {
    setState(JSON.stringify(updatedInstance))
  }

  useEffect(() => {
    const { token, type } = Application.container.providerManager.getProvider(providerClass)!
    if (!token || !type) return console.error('use getProvider not found ', providerClass)

    if (type === 'type:state') {
      const unsubscribe = Application.eventsState.on(`onStateChange:${token}`, handleUpdate)
      return () => unsubscribe()
    }
  }, [])

  return instance as any as T
}
