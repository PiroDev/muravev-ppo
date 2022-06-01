import BaseSpellEffects from '@/game/spells/BaseSpellEffects'

type SpellEffect<SpellEffectType extends keyof BaseSpellEffects> = {
  Effect: BaseSpellEffects[SpellEffectType]
  Params: any[]
}

export default SpellEffect