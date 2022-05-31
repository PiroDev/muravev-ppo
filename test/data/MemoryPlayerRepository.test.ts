import { assertEq, defineTest } from '#/utils'
import { Player, Spell, SpellEffect } from '@/data/models'
import { MemoryPlayerRepository, MemoryStorage } from '@/data/repos/memory'

export const memoryPlayerRepositoryTestSuite = () => {
  const fireball = new Spell('Fireball', 1, 1, ['target'], [
      [
        new SpellEffect('hp-', ['target', 1])
      ]
    ]
  )
  
  const newPlayer = (name: string, spells: Spell[] = [fireball]) => new Player(name, spells)
  
  const data: { [name: string]: Player } = {
    'PiroDev': newPlayer('PiroDev'),
    'Vayral': newPlayer('Vayral'),
  }
  
  const newStorage = () => new MemoryStorage(data)
  
  defineTest(`MemoryPlayerRepository should return existing Player`, () => {
    const playerRepo = new MemoryPlayerRepository(newStorage())
    
    const player = playerRepo.GetPlayer('PiroDev')
    
    return assertEq(player, data['PiroDev'])
  })
  
  defineTest(`MemoryPlayerRepository should add new Player`, () => {
    const playerRepo = new MemoryPlayerRepository(newStorage())
    const player = newPlayer('Bobston')
    
    playerRepo.AddPlayer(player)
    
    return assertEq(player, data['Bobston'])
  })
  
  defineTest(`MemoryPlayerRepository should remove existing Player`, () => {
    const playerRepo = new MemoryPlayerRepository(newStorage())
    
    playerRepo.RemovePlayer('PiroDev')
    
    return assertEq(playerRepo['PiroDev'], undefined)
  })
  
  defineTest(`MemoryPlayerRepository should return null if no such Player`, () => {
    const playerRepo = new MemoryPlayerRepository(newStorage())
    
    const player = playerRepo.GetPlayer('Alex')
    
    return assertEq(player, null)
  })
}