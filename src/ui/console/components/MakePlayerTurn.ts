import * as game from '@/game'
import { displayOptions, input } from '@/ui/console/utils'
import { SpellInfo } from '@/game/boundary'

export default class MakePlayerTurn {
  private readonly gameInteractor: game.boundary.GameInteractor
  private isRunning: boolean
  
  constructor(gameInteractor: game.boundary.GameInteractor) {
    this.gameInteractor = gameInteractor
  }
  
  async MakePlayerTurn() {
    this.isRunning = true
    
    while (this.isRunning) {
      displayOptions([
        '1: Использовать заклинание',
        '0: Закончить ход'
      ])
      const ans = await input()
      if (ans === '1') {
        const spells = this.getCurrentPlayerSpells()
        const availableSpells = spells.filter(s => s.IsAvailable())
        
        if (!availableSpells.length) {
          console.log('Доступных заклинаний нет')
        } else {
          const options = availableSpells.map((s, id) => (id + 1).toString() + ': ' + s.Name())
          console.log('Доступные заклинания:')
          displayOptions(options)
          console.log('0: Назад')
          const ans = await input()
  
          if (ans !== '0' && availableSpells[+ans - 1]) {
            const option = availableSpells[+ans - 1]
            const spellId = spells.findIndex(s => s.Name() === option.Name())
            
            const targets = this.getTargets()
            console.log('Возможные цели заклинания:')
            displayOptions(targets)
            const tId = +(await input('Выберите цель: ')) - 1
            
            this.gameInteractor.UseSpell(spellId, {
              'target': tId
            }, ['target'])
    
            console.log('Заклинание "' + option.Name() + '" успешно применено!')
          } else {
            console.log('Такой команды нет!')
          }
        }
      } else if (ans === '0') {
        this.isRunning = false
      } else {
        console.log('Такой команды нет')
      }
    }
    
    this.gameInteractor.EndTurn()
  }
  
  private getCurrentPlayerSpells(): SpellInfo[] {
    const turn = this.gameInteractor.GetTurn()
    return this.gameInteractor.GetPlayerInGame(turn).GetSpells()
  }
  
  private getTargets(): string[] {
    return this.gameInteractor.GetPlayersInGame().map((p, id) => (id + 1).toString() + ': ' + p.Name())
  }
}