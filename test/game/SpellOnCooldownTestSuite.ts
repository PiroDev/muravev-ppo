import { assertEq, defineTest } from '#/utils'
import SpellOnCooldown from '@/game/spells/SpellOnCooldown'
import { Spell } from '@/game/spells'
import { Player } from '@/game/characters'

export const spellOnCooldownTestSuite = () => {
  const newPlayer = (name: string = 'Bob', spells: Spell[] = [], hp: number = 10, mp: number = 10) => new Player(name, spells, hp, mp)
  
  const fireball = new SpellOnCooldown(
    new Spell('Fireball', 1, 1, [
      [
        {
          Effect: (target, value) => {
            target.TakeDamage(value)
          },
          Params: ['target', 1]
        }
      ]
    ])
  )
  
  const lifeSteal = new SpellOnCooldown(
    new Spell('LifeSteal', 1, 1, [
      [
        {
          Effect: (target, value) => {
            target.TakeDamage(value)
          },
          Params: ['enemy', 1]
        },
        {
          Effect: (target, value) => {
            target.TakeHealing(value)
          },
          Params: ['self', 1]
        }
      ]
    ])
  )
  
  defineTest(`SpellOnCooldown Cast should burn caster's mana`, () => {
    const p = newPlayer()
    
    fireball.Cast(p, {target: p})
    
    return assertEq(p.Mp(), 9)
  })
  
  defineTest(`SpellOnCooldown should be in cooldown after casting`, () => {
    const p = newPlayer()
    
    fireball.Cast(p, {target: p})
    
    return assertEq(fireball.IsAvailable(), false) && assertEq(fireball.GetCooldown(), 1)
  })
  
  defineTest(`SpellOnCooldown should generate proper effects`, () => {
    const self = newPlayer()
    const enemy = newPlayer()
    
    self.TakeDamage(2)
    const effects = lifeSteal.Cast(self, {self, enemy})
    effects.forEach(effectsPerTurn => {
      effectsPerTurn.forEach(e => {
        e.Use()
      })
    })
    
    return assertEq(self.Hp(), 9) && assertEq(enemy.Hp(), 9)
  })
  
  defineTest(`SpellOnCooldown should be available after decreasing cooldown`, () => {
    const p = newPlayer()

    fireball.Cast(p, {target: p})
    fireball.DecreaseCooldown(1)
    
    return assertEq(fireball.IsAvailable(), true) && assertEq(fireball.GetCooldown(), 0)
  })
}