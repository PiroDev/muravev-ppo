import UsableSpellEffect from '@/game/spells/UsableSpellEffect'
import SpellParams from '@/game/spells/SpellParams'
import Spell from '@/game/spells/Spell'
import { IMpInteractable } from '@/game/stats'

export default class SpellOnCooldown {
  private readonly spell: Spell
  private cooldown: number
  
  constructor(spell: Spell) {
    this.spell = spell
    this.cooldown = 0
  }
  
  Cast(caster: IMpInteractable, params: SpellParams): UsableSpellEffect[][] {
    const effects = this.spell.Cast(caster, params)
    this.startCooldown()
    
    return effects
  }
  
  GetCooldown(): number {
    return this.cooldown
  }
  
  IsAvailable() {
    return this.cooldown === 0
  }
  
  DecreaseCooldown(count: number) {
    if (count >= this.cooldown) {
      this.cooldown = 0
    } else {
      this.cooldown -= count
    }
  }
  
  Name(): string {
    return this.spell.Name()
  }
  
  Manacost(): number {
    return this.spell.Manacost()
  }
  
  private startCooldown() {
    this.cooldown = this.spell.Cooldown()
  }
}
