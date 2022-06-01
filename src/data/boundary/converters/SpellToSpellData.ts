import { SpellData, SpellEffectData } from '@/structs'
import { Spell, SpellEffect } from '@/data/models'

export default class SpellToSpellData {
  static Convert(spell: Spell): SpellData {
    const mappedEffects = this.mapEffects(spell.Effects())
    return {
      Name: spell.Name(),
      Manacost: spell.Manacost(),
      Cooldown: spell.Cooldown(),
      Params: spell.Params(),
      Effects: mappedEffects
    }
  }
  
  private static mapEffects(effects: SpellEffect[][]): SpellEffectData[][] {
    const mappedEffects: SpellEffectData[][] = []
    for (const effectsPerTurn of effects) {
      const effectsPerTurnMapped = effectsPerTurn.map(e => {
        return {Type: e.Type(), Params: e.Params()} as SpellEffectData
      })
      mappedEffects.push(effectsPerTurnMapped)
    }
    
    return mappedEffects
  }
}
