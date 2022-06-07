import IMemoryStorage from '@/repos/memory/IMemoryStorage'
import { PlayerData } from '@/dto'

export default class MemoryStorage implements IMemoryStorage {
  private readonly storage: { [name: string]: PlayerData }
  
  constructor(storage: { [name: string]: PlayerData }) {
    this.storage = storage
  }
  
  Players(): { [name: string]: PlayerData } {
    return this.storage
  }
}
