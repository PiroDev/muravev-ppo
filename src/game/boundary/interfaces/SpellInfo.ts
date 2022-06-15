import SpellOnCooldown from '@/game/spells/SpellOnCooldown'

type SpellInfo = Omit<SpellOnCooldown, "Cast" | "DecreaseCooldown">

export default SpellInfo