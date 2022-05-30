import EventBus from '@/game/events/EventBus'
import GameEvents from '@/game/events/GameEvents'
import PlayerEvents from '@/game/events/PlayerEvents'

type GameEventBus = EventBus<PlayerEvents & GameEvents>

export default GameEventBus