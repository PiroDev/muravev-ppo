import { PlayerData, SpellData } from '@/dto'
import { MemoryPlayerRepository, MemorySpellRepository, MemoryStorage } from '@/data/repos/memory'
import { assertEq, defineTest } from '#/utils'

export const memorySpellRepositoryTestSuite = () => {
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
  
  defineTest(`MemorySpellRepository should return existing SpellData`, () => {
    const spellRepo = new MemorySpellRepository(newPlayerRepo())
    
    const spell = spellRepo.GetSpell('PiroDev', 'Fireball')
    
    return assertEq(spell, fireball)
  })
  
  defineTest(`MemorySpellRepository should add new SpellData`, () => {
    const spellRepo = new MemorySpellRepository(newPlayerRepo())
    const frostArrow = newSpell('Frost arrow')
    
    spellRepo.AddSpell('PiroDev', frostArrow)
    
    return assertEq(data['PiroDev'].Spells.includes(frostArrow), true)
  })
  
  defineTest(`MemorySpellRepository should remove existing SpellData`, () => {
    const spellRepo = new MemorySpellRepository(newPlayerRepo())
  
    spellRepo.RemoveSpell('PiroDev', 'Fireball')
  
    return assertEq(data['PiroDev'].Spells.includes(fireball), false)
  })
  
  defineTest(`MemorySpellRepository should return null if no such SpellData`, () => {
    const spellRepo = new MemorySpellRepository(newPlayerRepo())
  
    const healCoil = spellRepo.GetSpell('PiroDev', 'Heal coil')
  
    return assertEq(healCoil, null)
  })
}