import { SpellData, SpellEffectData } from '@/structs'
import { Spell, SpellEffect } from '@/data/models'

export default class SpellDataToSpell {
  static Convert(spellData: SpellData): Spell {
    const mappedEffects = this.mapEffects(spellData.Effects)
    return new Spell(spellData.Name, spellData.Manacost, spellData.Cooldown, spellData.Params, mappedEffects)
  }
  
  private static mapEffects(effects: SpellEffectData[][]): SpellEffect[][] {
    const mappedEffects: SpellEffect[][] = []
    for (const effectsPerTurn of effects) {
      const effectsPerTurnMapped = effectsPerTurn.map(e => new SpellEffect(e.Type, e.Params))
      mappedEffects.push(effectsPerTurnMapped)
    }
    
    return mappedEffects
  }
}
