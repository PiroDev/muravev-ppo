import * as game from '@/game'
import { displayOptions, entry, input } from '@/ui/console/utils'
import ChooseProfile from '@/ui/console/components/ChooseProfile'
import { IPlayerInfo } from '@/game/boundary'
import MakePlayerTurn from '@/ui/console/components/MakePlayerTurn'
import CreateProfile from '@/ui/console/components/CreateProfile'

export default class ConsoleUI {
  private readonly gameInteractor: game.boundary.GameInteractor
  private eventBus: game.events.GameEventBus | null
  private isRunning: boolean
  
  constructor(gameInteractor: game.boundary.GameInteractor) {
    this.gameInteractor = gameInteractor
    this.eventBus = null
  }
  
  async Run() {
    await entry('Добро пожаловать в Spell Warfare!')
    
    this.isRunning = true
    while (this.isRunning) {
      displayOptions([
        '1: Начать игру',
        '2: Создать профиль игрока',
        '0: Выйти'
      ])
      const ans = await input()
      if (ans === '1') {
        const profileChooser = new ChooseProfile(this.gameInteractor)
        
        console.log('Выбор профиля игрока 1')
        const player1 = await profileChooser.ChooseProfile()
        
        console.log('Выбор профиля игрока 2')
        const player2 = await profileChooser.ChooseProfile()
  
        console.log("Игра начинается!")
        this.eventBus = this.gameInteractor.NewGame([player1, player2])
        this.addEventListeners()
        console.log('Раунд 0')
        console.log('Ход игрока', this.getCurrentPlayer().Name())
  
        const turnMaker = new MakePlayerTurn(this.gameInteractor)
        while (this.isRunning) {
          await turnMaker.MakePlayerTurn()
        }
      } else if (ans === '2') {
        const createProfile = new CreateProfile()
        const playerData = await createProfile.CreateProfile()
        this.gameInteractor.AddPlayerData(playerData)
      } else if (ans === '0') {
        this.isRunning = false
      } else {
        console.log('Такой команды нет')
      }
    }
  }
  
  private addEventListeners() {
    this.eventBus.On('game:newRound', (type, data) => {
      console.log('Раунд', data['newRound'] + 1, '\n')
    })
    
    this.eventBus.On('game:newTurn', (type, data) => {
      console.log('Ход игрока', this.getCurrentPlayer().Name(), '\n')
    })
    
    this.eventBus.On('player:damageTaken', (type, data) => {
      console.log(this.getPlayer(data['id']).Name(), 'получил', data['amount'], 'урона', '\n')
    })
    
    this.eventBus.On('player:healingTaken', (type, data) => {
      console.log(this.getPlayer(data['id']).Name(), 'вылечил', data['amount'], 'здоровья', '\n')
    })
    
    this.eventBus.On('player:manaBurned', (type, data) => {
      console.log(this.getPlayer(data['id']).Name(), 'потерял', data['amount'], 'маны', '\n')
    })
    
    this.eventBus.On('player:manaReplenished', (type, data) => {
      console.log(this.getPlayer(data['id']).Name(), 'восполнил', data['amount'], 'маны', '\n')
    })
    
    this.eventBus.On('game:over', (type, data) => {
      if (data['winner'] === undefined) {
        console.log('Ничья', '\n')
      } else {
        console.log('Победил', this.getPlayer(data['winner']).Name() + '!', '\n')
      }
      
      this.isRunning = false
    })
  }
  
  private getPlayer(playerId: number): IPlayerInfo {
    return this.gameInteractor.GetPlayerInGame(playerId)
  }
  
  private getCurrentPlayer(): IPlayerInfo {
    const turn = this.gameInteractor.GetTurn()
    return this.getPlayer(turn)
  }
}