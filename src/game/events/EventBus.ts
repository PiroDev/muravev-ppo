import IEventEmitter from '@/game/events/IEventEmitter'

type Callback<Events, EventType extends keyof Events = keyof Events> = (type: EventType, data: Events[EventType]) => void
type ListenersMap<Events, EventType extends keyof Events = keyof Events> = {[key in EventType]: Callback<Events, EventType>[]}

export default class EventBus<Events, EventType extends keyof Events = keyof Events> implements IEventEmitter<Events> {
  private readonly listeners: ListenersMap<Events>
  
  constructor() {
    this.listeners = {} as ListenersMap<Events>
  }
  
  On(type: EventType, callback: Callback<Events>) {
    if (!this.listeners[type]) {
      this.listeners[type] = []
    }
    
    if (!this.listeners[type].includes(callback)) {
      this.listeners[type].push(callback)
    }
  }
  
  Off(type: EventType, callback: Callback<Events>) {
    if (!this.listeners[type]) {
      return
    }
    
    this.listeners[type] = this.listeners[type].filter(el => el !== callback)
  }
  
  Emit<EventType extends keyof Events>(type: EventType, data: Events[EventType]): void {
    if (!this.listeners[type]) {
      return
    }
    
    for (const callback of this.listeners[type]) {
      callback(type, data)
    }
  }
}