import SpellEffect from '@/data/models/SpellEffect'

export default class Spell {
  private readonly name: string
  private readonly manacost: number
  private readonly cooldown: number
  private readonly params: string[]
  private readonly effects: SpellEffect[][]
  
  constructor(name: string, manacost: number, cooldown: number, params: string[], effects: SpellEffect[][]) {
    this.name = name
    this.manacost = manacost
    this.cooldown = cooldown
    this.params = params
    this.effects = effects
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
  
  Params(): string[] {
    return this.params
  }
  
  Effects(): SpellEffect[][] {
    return this.effects
  }

}