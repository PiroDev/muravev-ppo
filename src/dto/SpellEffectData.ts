import BaseSpellEffects from '@/game/spells/BaseSpellEffects'

type SpellEffectData = {
  Type: keyof BaseSpellEffects
  Params: any[]
}

export default SpellEffectData