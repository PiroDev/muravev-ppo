import { assertEq, defineTest } from '#/utils'
import { PlayerData, SpellData } from '@/dto'
import { MemoryPlayerRepository, MemoryStorage } from '@/data/repos/memory'

export const memoryPlayerRepositoryTestSuite = () => {
  const fireball: SpellData = {
    Name: 'Fireball',
    Params: ['target'],
    Manacost: 1,
    Cooldown: 1,
    Effects: [
      [{Params: ['target', 1], Type: 'hp-'}]
    ],
  }
  
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
  
  const newStorage = () => new MemoryStorage(data)
  
  defineTest(`MemoryPlayerRepository should return existing PlayerData`, () => {
    const playerRepo = new MemoryPlayerRepository(newStorage())
    
    const player = playerRepo.GetPlayer('PiroDev')
    
    return assertEq(player, data['PiroDev'])
  })
  
  defineTest(`MemoryPlayerRepository should add new PlayerData`, () => {
    const playerRepo = new MemoryPlayerRepository(newStorage())
    const player = newPlayer('Bobston')
    
    playerRepo.AddPlayer(player)
    
    return assertEq(player, data['Bobston'])
  })
  
  defineTest(`MemoryPlayerRepository should remove existing PlayerData`, () => {
    const playerRepo = new MemoryPlayerRepository(newStorage())
    
    playerRepo.RemovePlayer('PiroDev')
    
    return assertEq(playerRepo['PiroDev'], undefined)
  })
  
  defineTest(`MemoryPlayerRepository should return null if no such PlayerData`, () => {
    const playerRepo = new MemoryPlayerRepository(newStorage())
    
    const player = playerRepo.GetPlayer('Alex')
    
    return assertEq(player, null)
  })
}