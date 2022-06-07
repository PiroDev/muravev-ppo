import GameContext from '@/game/GameContext'
import { PlayerDataConverter } from '@/game/boundary/converters'
import { SpellParams } from '@/game/spells'
import { EventBus, GameEventBus } from '@/game/events'
import IPlayerInfo from '@/game/boundary/interfaces/IPlayerInfo'
import { IPlayerRepository, ISpellRepository } from '@/repos'
import { PlayerData, SpellData } from '@/dto'

const MAX_ROUNDS = 20

export default class GameInteractor {
  private game: GameContext | null
  private readonly playerRepo: IPlayerRepository
  private readonly spellRepo: ISpellRepository
  
  constructor(playerRepo: IPlayerRepository, spellRepo: ISpellRepository) {
    this.playerRepo = playerRepo
    this.spellRepo = spellRepo
    this.game = null
  }
  
  GetPlayerData(playerName: string): PlayerData | null {
    return this.playerRepo.GetPlayer(playerName)
  }
  
  AddPlayerData(playerData: PlayerData) {
    this.playerRepo.SetPlayer(playerData)
  }
  
  RemovePlayerData(playerName: string) {
    this.playerRepo.RemovePlayer(playerName)
  }
  
  GetPlayerSpell(playerName: string, spellName: string): SpellData | null {
    return this.spellRepo.GetSpell(playerName, spellName)
  }
  
  AddPlayerSpell(playerName: string, spellData: SpellData) {
    this.spellRepo.SetSpell(playerName, spellData)
  }
  
  RemovePlayerSpell(playerName: string, spellName: string) {
    this.spellRepo.RemoveSpell(playerName, spellName)
  }
  
  NewGame(playerNames: string[], maxRounds: number = MAX_ROUNDS): GameEventBus | null {
    const converter = new PlayerDataConverter()
    
    const playersData = []
    for (const pName of playerNames) {
      const playerData = this.playerRepo.GetPlayer(pName)
      if (!playerData) {
        return null
      }
      playersData.push(playerData)
    }
    
    const players = playersData.map(p => converter.Convert(p))
    
    const eventBus: GameEventBus = new EventBus()
    
    this.game = new GameContext(players, maxRounds, eventBus)
    return eventBus
  }
  
  UseSpell(spellId: number, params: SpellParams, mapIdParamsToPlayers: string[] = []): void {
    if (this.isGameStarted()) {
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
  }
  
  EndTurn(): void {
    if (this.isGameStarted()) {
      this.game.EndTurn()
    }
  }
  
  GetRound(): number {
    if (this.isGameStarted()) {
      return this.game.GetRound()
    }
  }
  
  GetTurn(): number {
    if (this.isGameStarted()) {
      return this.game.GetTurn()
    }
  }
  
  GetPlayerInGame(playerId: number): IPlayerInfo | null {
    if (this.isGameStarted()) {
      return this.game.GetPlayer(playerId)
    }
    
    return null
  }
  
  GetPlayersInGame(): IPlayerInfo[] {
    if (this.isGameStarted()) {
      return this.game.GetPlayers()
    }
    
    return []
  }
  
  private isGameStarted(): boolean {
    return this.game !== null
  }
}