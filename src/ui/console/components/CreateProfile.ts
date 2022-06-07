import { displayOptions, input } from '@/ui/console/utils'
import { PlayerData } from '@/dto'
import CreateSpell from '@/ui/console/components/CreateSpell'

export default class CreateProfile {
  private isRunning: boolean
  
  async CreateProfile(): Promise<PlayerData> {
    this.isRunning = true
    let playerData: PlayerData = {
      Name: '',
      Spells: []
    }
    while (this.isRunning) {
      const playerName = await input('Введите имя игрока: ')
      if (playerName.length > 1) {
        playerData.Name = playerName
        while (this.isRunning) {
          displayOptions([
            '1: Создать заклинание',
            '0: Завершить создание профиля'
          ])
          const ans = await input()
          if (ans === '1') {
            const createSpell = new CreateSpell()
            const spellData = await createSpell.CreateSpell()
            playerData.Spells.push(spellData)
          } else if (ans === '0') {
            this.isRunning = false
          } else {
            console.log('Такой команды нет')
          }
        }
      }
    }
    
    return playerData
  }
}