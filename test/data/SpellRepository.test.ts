import { PlayerData, SpellData } from '@/dto'
import { SpellRepository } from '@/repos'
import { MemoryPlayerRepository, MemoryStorage } from '@/repos/memory'
import { assertEq, defineTest } from '#/utils'

export const SpellRepositoryTestSuite = () => {
  const newSpell = (name: string = 'Fireball') => {
    return {
      Name: name,
      Params: ['target'],
      Manacost: 1,
      Cooldown: 1,
      Effects: [
        [{Params: ['target', 1], Type: 'hp-'}]
      ],
    } as SpellData
  }
  
  const fireball = newSpell()
  
  const newPlayer = (name: string, spells: SpellData[] = [fireball]) => {
    return {
      Name: name,
      Spells: spells
    } as PlayerData
  }
  
  const data: { [name: string]: PlayerData } = {
    'PiroDev': newPlayer('PiroDev'),
    'Vayral': newPlayer('Vayral'),
  }
  
  const newPlayerRepo = () => new MemoryPlayerRepository(new MemoryStorage(data))
  
  defineTest(`SpellRepository should return existing SpellData`, () => {
    const spellRepo = new SpellRepository(newPlayerRepo())
    
    const spell = spellRepo.GetSpell('PiroDev', 'Fireball')
    
    return assertEq(spell, fireball)
  })
  
  defineTest(`SpellRepository should add new SpellData`, () => {
    const spellRepo = new SpellRepository(newPlayerRepo())
    const frostArrow = newSpell('Frost arrow')
    
    spellRepo.SetSpell('PiroDev', frostArrow)
    
    return assertEq(data['PiroDev'].Spells.includes(frostArrow), true)
  })
  
  defineTest(`SpellRepository should remove existing SpellData`, () => {
    const spellRepo = new SpellRepository(newPlayerRepo())
  
    spellRepo.RemoveSpell('PiroDev', 'Fireball')
  
    return assertEq(data['PiroDev'].Spells.includes(fireball), false)
  })
  
  defineTest(`SpellRepository should return null if no such SpellData`, () => {
    const spellRepo = new SpellRepository(newPlayerRepo())
  
    const healCoil = spellRepo.GetSpell('PiroDev', 'Heal coil')
  
    return assertEq(healCoil, null)
  })
}