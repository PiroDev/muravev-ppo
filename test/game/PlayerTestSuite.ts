import { Player } from '@/game/characters'
import { Spell } from '@/game/spells'
import { assertEq, defineTest } from '#/utils'

export const playerTestSuite = () => {
  const newPlayer = (name: string = 'Bob', spells: Spell[] = [], hp: number = 10, mp: number = 10) => new Player(name, spells, hp, mp)
  
  defineTest('Player should take damage', () => {
    const p = newPlayer()
    
    p.TakeDamage(2)
    
    return assertEq(p.Hp(), 8)
  })
  
  defineTest('Player should take healing', () => {
    const p = newPlayer()
    
    p.TakeDamage(2)
    p.TakeHealing(1)
    
    return assertEq(p.Hp(), 9)
  })
  
  defineTest(`Player's mana should be burnable`, () => {
    const p = newPlayer()
  
    p.BurnMana(3)
  
    return assertEq(p.Mp(), 7)
  })
  
  defineTest(`Player's mana should be replenishable`, () => {
    const p = newPlayer()
    
    p.BurnMana(3)
    p.ReplenishMana(1)
    
    return assertEq(p.Mp(), 8)
  })
}