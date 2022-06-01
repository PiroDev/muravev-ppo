import { SpellData, SpellEffectData } from '@/structs'
import { Spell, SpellEffect } from '@/game/spells'
import BaseSpellEffectGetter from '@/game/spells/BaseSpellEffectGetter'

export default class SpellDataConverter {
  Convert(spellData: SpellData): Spell {
    const mappedEffects = this.mapEffects(spellData.Effects)
    return new Spell(spellData.Name, spellData.Manacost, spellData.Cooldown, mappedEffects)
  }
  
  private mapEffects(effects: SpellEffectData[][]): SpellEffect<any>[][] {
    const spellEffectGetter = new BaseSpellEffectGetter()
    const mappedEffects: SpellEffect<any>[][] = []
    for (const effectsPerTurn of effects) {
      const effectsPerTurnMapped = effectsPerTurn.map(e => {
        return {
          Effect: spellEffectGetter.GetSpellEffect(e.Type),
          Params: e.Params
        }
      })
      
      mappedEffects.push(effectsPerTurnMapped)
    }
    
    return mappedEffects
  }
}
