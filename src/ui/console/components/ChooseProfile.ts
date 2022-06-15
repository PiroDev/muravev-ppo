import { input } from '@/ui/console/utils'
import * as game from '@/game'

export default class ChooseProfile {
  private isRunning: boolean
  private gameInteractor: game.boundary.GameInteractor
  
  constructor(gameInteractor: game.boundary.GameInteractor) {
    this.gameInteractor = gameInteractor
  }
  
  async ChooseProfile(): Promise<string> {
    this.isRunning = true
    let playerData = null
    let playerName = null
    while (this.isRunning) {
      playerName = await input('Введите имя игрока: ')
      playerData = this.gameInteractor.GetPlayerData(playerName)
      if (playerData !== null) {
        console.log(playerData)
        
        const res = await input('Продолжить с текущим профилем? [да/нет]: ')
        if (res.toLowerCase() === 'да') {
          this.isRunning = false
        }
      } else {
        console.log('Игрока с таким именем не существует', '\n')
      }
    }
    console.log()

    return playerName
  }
}