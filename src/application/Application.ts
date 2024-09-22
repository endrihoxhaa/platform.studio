import { EventEmitter, Network, Container, ProviderClass } from 'platform'
import { ApplicationEvents, ApplicationEventsState } from './ApplicationEvents'
import { ApplicationParameters } from './ApplicationParameters'
import { Root, createRoot } from 'react-dom/client'
import { Router } from '#router/Router'
import { View } from '#view/View'

export class Application {
  public static id: string

  public static version: string

  public static container: Container = new Container()

  public static events: EventEmitter<ApplicationEvents> = new EventEmitter()

  public static eventsState: EventEmitter<ApplicationEventsState> = new EventEmitter()

  public static rootModule: ProviderClass

  public static rootView: View

  public static rootElement: HTMLElement

  public static rootReact: Root

  public static network: Network = new Network()
  public static router: Router = new Router()

  static setParameters({ id, root, version }: ApplicationParameters) {
    Application.id = id
    Application.version = version
    Application.rootElement = document.querySelector(root)!
    Application.rootElement.setAttribute('id', Application.id)
    Application.rootElement.setAttribute('version', Application.version)
  }

  static setRootModule(appModule: ProviderClass) {
    Application.rootModule = appModule
  }

  static setRootView(appView: View) {
    Application.rootView = appView
  }

  static boot() {
    Application.container.registerManual({
      type: 'type:value',
      token: Network['name'],
      payload: Application.network,
      parameters: [],
      properties: [],
    })

    Application.container.registerManual({
      type: 'type:value',
      token: Router['name'],
      payload: Application.router,
      parameters: [],
      properties: [],
    })

    // register all providers
    Application.container.register(Application.rootModule)

    // create react root dom
    Application.rootReact = createRoot(Application.rootElement)
  }

  static async start() {
    // render the application
    Application.rootReact.render(Application.rootView())

    // resolve all providers
    Application.container.resolveSync(Application.rootModule)

    // notify
    Application.events.fire('onStart')
    await Application.container.instanceManager.runAsync('onStart', '*')
  }

  static stop() {
    // notify all providers
    Application.events.fire('onStop')
    Application.container.instanceManager.runAsync('onStop', '*')
  }
}
