import SpellOnCooldown from '@/game/spells/SpellOnCooldown'
import AbstractCharacter from '@/game/characters/AbstractCharacter'
import { Spell, SpellParams, UsableSpellEffect } from '@/game/spells'
import IMageCharacter from '@/game/characters/IMageCharacter'

export default class Player extends AbstractCharacter implements IMageCharacter {
  private readonly spells: SpellOnCooldown[]
  
  constructor(name: string, spells: Spell[], hp: number = 10, mp: number = 10) {
    super(name, hp, mp)
    
    this.spells = spells.map(spell => new SpellOnCooldown(spell))
  }
  
  CastSpell(spellId: number, params: SpellParams): UsableSpellEffect[][] {
    if (spellId < 0 || spellId >= this.spells.length) {
      return []
    }
    
    const spell = this.spells[spellId]
    return spell.Cast(this, params)
  }
  
  GetSpell(spellId: number): SpellOnCooldown | null {
    if (!this.spells[spellId]) {
      return null
    }
    
    return this.spells[spellId]
  }
  
  GetSpells(): SpellOnCooldown[] {
    return this.spells
  }
}
