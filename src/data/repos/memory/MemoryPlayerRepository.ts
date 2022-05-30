import { IPlayerRepository } from '@/data/repos'
import { Player } from '@/data/models'
import IMemoryStorage from '@/data/repos/memory/IMemoryStorage'

export default class MemoryPlayerRepository implements IPlayerRepository {
  private readonly storage: IMemoryStorage
  
  constructor(storage: IMemoryStorage) {
    this.storage = storage
  }
  
  AddPlayer(player: Player): void {
    this.storage.Players()[player.Name()] = player
  }
  
  GetPlayer(name: string): Player | null {
    if (!this.storage.Players()[name]) {
      return null
    }
    
    return this.storage.Players()[name]
  }
  
  RemovePlayer(name: string): void {
    delete this.storage.Players()[name]
  }

}