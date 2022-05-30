import SpellParams from '@/game/spells/SpellParams'
import SpellEffect from '@/game/spells/SpellEffect'
import UsableSpellEffect from '@/game/spells/UsableSpellEffect'
import { IMpInteractable } from '@/game/stats'

export default class Spell {
  private readonly name: string
  private readonly effects: SpellEffect<any>[][]
  private readonly manacost: number
  private readonly cooldown: number
  
  constructor(name: string, manacost: number, cooldown: number, effects: SpellEffect<any>[][]) {
    this.name = name
    this.effects = effects
    this.manacost = manacost
    this.cooldown = cooldown
  }
  
  Cast(caster: IMpInteractable, params: SpellParams): UsableSpellEffect[][] {
    if (caster.Mp() < this.manacost) {
      return []
    }
    
    caster.BurnMana(this.manacost)
    
    const usableEffects: UsableSpellEffect[][] = []
    for (const effectsPerTurn of this.effects) {
      const usablePerTurn = effectsPerTurn.map(e => {
        const mappedParams = e.Params.map(p => p in params ? params[p] : p)
        
        const effect = e.Effect.bind(null, ...mappedParams)
        return new UsableSpellEffect(effect)
      })
    
      usableEffects.push(usablePerTurn)
    }
    
    return usableEffects
  }
  
  Name(): string {
    return this.name
  }
  
  Manacost(): number {
    return this.manacost
  }
  
  Cooldown(): number {
    return this.cooldown
  }
}