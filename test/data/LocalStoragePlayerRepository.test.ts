import { assertEq, defineTest } from '#/utils'
import { PlayerData, SpellData } from '@/dto'
import { LocalStoragePlayerRepository } from '@/repos'
import { LocalStorage } from 'node-localstorage'

export const localStoragePlayerRepositoryTestSuite = () => {
  global.localStorage = new LocalStorage('./scratch')
  
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
  
  defineTest(`LocalStoragePlayerRepository should return existing PlayerData`, () => {
    const playerRepo = new LocalStoragePlayerRepository()
    const player = newPlayer('PiroDev')
    
    localStorage.setItem(player.Name, JSON.stringify(player))
    
    return assertEq(player, playerRepo.GetPlayer('PiroDev'))
  })
  
  defineTest(`LocalStoragePlayerRepository should add new PlayerData`, () => {
    const playerRepo = new LocalStoragePlayerRepository()
    const player = newPlayer('Bobston')
    
    playerRepo.SetPlayer(player)
    
    return assertEq(player, JSON.parse(localStorage.getItem(player.Name)))
  })
  
  defineTest(`LocalStoragePlayerRepository should remove existing PlayerData`, () => {
    const playerRepo = new LocalStoragePlayerRepository()
    
    playerRepo.RemovePlayer('PiroDev')
    
    return assertEq(localStorage.getItem('PiroDev'), null)
  })
  
  defineTest(`LocalStoragePlayerRepository should return null if no such PlayerData`, () => {
    const playerRepo = new LocalStoragePlayerRepository()
    
    const player = playerRepo.GetPlayer('Alex')
    
    return assertEq(player, null)
  })
}