import { IPlayerRepository } from '@/repos'
import { PlayerData } from '@/dto'
import { PlayerDataValidator } from '@/dto/validators'

export default class LocalStoragePlayerRepository implements IPlayerRepository {
  private playerValidator: PlayerDataValidator
  
  constructor() {
    this.playerValidator = new PlayerDataValidator()
  }
  
  SetPlayer(player: PlayerData): void {
    const playerJson = JSON.stringify(player)
    try {
      localStorage.setItem(player.Name, playerJson)
    } catch (e) {
      console.log('Error in LocalStoragePlayerRepository.AddPlayer:', e)
    }
  }
  
  GetPlayer(name: string): PlayerData | null {
    const playerJson = localStorage.getItem(name)
    
    try {
      const player = JSON.parse(playerJson)
      if (!this.playerValidator.Validate(player)) {
        return null
      }
      
      return player
    } catch (e) {
      console.log('Error in LocalStoragePlayerRepository.GetPlayer:', e)
    }
  }
  
  RemovePlayer(name: string): void {
    localStorage.removeItem(name)
  }
}