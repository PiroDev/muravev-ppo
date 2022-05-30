import IMemoryStorage from '@/data/repos/memory/IMemoryStorage'
import { Player } from '@/data/models'

const data: { [name: string]: Player } = {}

class MemoryStorage implements IMemoryStorage {
  private readonly storage: { [name: string]: Player }
  
  constructor(storage: { [name: string]: Player }) {
    this.storage = storage
  }
  
  Players(): { [name: string]: Player } {
    return this.storage
  }
}

export const storage = new MemoryStorage(data)