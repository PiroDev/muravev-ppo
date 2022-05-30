export default interface IEventEmitter<Events> {
  Emit<EventType extends keyof Events>(type: EventType, data: Events[EventType]): void
}
