import Spell from '@/data/models/Spell'

export default class Player {
  private readonly name: string
  private readonly spells: Spell[]
  
  constructor(name: string, spells: Spell[]) {
    this.name = name
    this.spells = spells
  }
  
  Name(): string {
    return this.name
  }
  
  Spells(): Spell[] {
    return this.spells
  }
}