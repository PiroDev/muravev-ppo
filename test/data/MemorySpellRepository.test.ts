import { Player, Spell, SpellEffect } from '@/data/models'
import { MemoryPlayerRepository, MemorySpellRepository, MemoryStorage } from '@/data/repos/memory'
import { assertEq, defineTest } from '#/utils'

export const memorySpellRepositoryTestSuite = () => {
  const newSpell = (name: string = 'Fireball') => new Spell(name, 1, 1, ['target'], [
      [
        new SpellEffect('hp-', ['target', 1])
      ]
    ]
  )
  
  const fireball = newSpell()
  
  const newPlayer = (name: string, spells: Spell[] = [fireball]) => new Player(name, spells)
  
  const data: { [name: string]: Player } = {
    'PiroDev': newPlayer('PiroDev'),
    'Vayral': newPlayer('Vayral'),
  }
  
  const newPlayerRepo = () => new MemoryPlayerRepository(new MemoryStorage(data))
  
  defineTest(`MemorySpellRepository should return existing Spell`, () => {
    const spellRepo = new MemorySpellRepository(newPlayerRepo())
    
    const spell = spellRepo.GetSpell('PiroDev', 'Fireball')
    
    return assertEq(spell, fireball)
  })
  
  defineTest(`MemorySpellRepository should add new Spell`, () => {
    const spellRepo = new MemorySpellRepository(newPlayerRepo())
    const frostArrow = newSpell('Frost arrow')
    
    spellRepo.AddSpell('PiroDev', frostArrow)
    
    return assertEq(data['PiroDev'].Spells().includes(frostArrow), true)
  })
  
  defineTest(`MemorySpellRepository should remove existing Spell`, () => {
    const spellRepo = new MemorySpellRepository(newPlayerRepo())
  
    spellRepo.RemoveSpell('PiroDev', 'Fireball')
  
    return assertEq(data['PiroDev'].Spells().includes(fireball), false)
  })
  
  defineTest(`MemorySpellRepository should return null if no such Spell`, () => {
    const spellRepo = new MemorySpellRepository(newPlayerRepo())
  
    const healCoil = spellRepo.GetSpell('PiroDev', 'Heal coil')
  
    return assertEq(healCoil, null)
  })
}