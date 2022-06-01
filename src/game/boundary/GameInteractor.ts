import GameContext from '@/game/GameContext'
import { PlayerData } from '@/structs'
import { PlayerDataConverter } from '@/game/boundary/converters'
import { SpellParams } from '@/game/spells'
import { GameEventBus } from '@/game/events'
import IPlayerInfo from '@/game/boundary/interfaces/IPlayerInfo'

export default class GameInteractor {
  private game: GameContext | null
  
  constructor() {
    this.game = null
  }
  
  NewGame(playersData: PlayerData[], eventBus: GameEventBus, maxRounds: number = 20): void {
    const converter = new PlayerDataConverter()
    const players = playersData.map(p => converter.Convert(p))
    
    this.game = new GameContext(players, maxRounds, eventBus)
  }
  
  UseSpell(spellId: number, params: SpellParams, mapIdParamsToPlayers: string[] = []): void {
    if (!this.game) {
      return
    }
    
    const mappedParams = {
      ...params
    }
    mapIdParamsToPlayers.forEach(p => {
      if (p in params) {
        mappedParams[p] = this.game.GetPlayer(params[p])
      }
    })
    
    this.game.UseSpell(spellId, mappedParams)
  }
  
  EndTurn(): void {
    if (!this.game) {
      return
    }

    this.game.EndTurn()
  }
  
  GetRound(): number {
    if (!this.game) {
      return
    }
    
    return this.game.GetRound()
  }
  
  GetTurn(): number {
    if (!this.game) {
      return
    }
    
    return this.game.GetTurn()
  }
  
  GetPlayer(playerId: number): IPlayerInfo | null {
    return this.game.GetPlayer(playerId)
  }
  
  GetPlayers(): IPlayerInfo[] {
    return this.game.GetPlayers()
  }
}