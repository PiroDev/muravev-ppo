import ICharacter from '@/game/characters/ICharacter'

export default abstract class AbstractCharacter implements ICharacter {
  protected readonly name: string
  protected hp: () => number
  protected mp: () => number
  protected maxHp: () => number
  protected maxMp: () => number
  
  protected constructor(name: string, hp: number, mp: number) {
    this.name = name
    
    this.hp = () => hp
    this.maxHp = () => hp
    
    this.mp = () => mp
    this.maxMp = () => mp
  }
  
  Name(): string {
    return this.name
  }
  
  Hp(): number {
    return this.hp()
  }
  
  Mp(): number {
    return this.mp()
  }
  
  MaxHp(): number {
    return this.maxHp()
  }
  
  MaxMp(): number {
    return this.maxMp()
  }
  
  TakeDamage(amount: number) {
    const hp = this.hp() - amount
    
    if (hp > 0) {
      this.hp = () => hp
    } else {
      this.hp = () => 0
    }
  }
  
  TakeHealing(amount: number) {
    const hp = this.hp() + amount
    const maxHp = this.maxHp()
    
    if (hp < maxHp) {
      this.hp = () => hp
    } else {
      this.hp = () => maxHp
    }
  }
  
  BurnMana(amount: number) {
    const mp = this.mp() - amount
    
    if (mp > 0) {
      this.mp = () => mp
    } else {
      this.mp = () => 0
    }
  }
  
  ReplenishMana(amount: number) {
    const mp = this.mp() + amount
    const maxMp = this.maxMp()
    
    if (mp < maxMp) {
      this.mp = () => mp
    } else {
      this.mp = () => maxMp
    }
  }
}