import BaseSpellEffects from '@/game/spells/BaseSpellEffects'

type SpellEffect<EffectType extends keyof Effects, Effects = BaseSpellEffects> = {
  Effect: Effects[EffectType]
  Params: any[]
}

export default SpellEffect