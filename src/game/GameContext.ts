import Player from '@/game/characters/Player'
import { SpellParams, UsableSpellEffect } from '@/game/spells'
import { GameEventBus } from '@/game/events'
import PlayerEventProxy from '@/game/events/PlayerEventProxy'
import IStatsEvaluable from '@/game/stats/IStatsEvaluable'

export default class GameContext {
  private readonly players: PlayerEventProxy[]
  private readonly effectsQueue: UsableSpellEffect[][]
  private turn: number
  private round: number
  private readonly maxRounds: number
  private readonly gameEventBus: GameEventBus
  
  constructor(players: Player[], maxRounds: number, gameEventBus: GameEventBus) {
    this.gameEventBus = gameEventBus
    this.players = players.map((p, id) => new PlayerEventProxy(p, id, gameEventBus))
  
    this.maxRounds = maxRounds
    this.round = 0
    this.turn = 0
    this.effectsQueue = []
  }
  
  GetTurn() : number {
    return this.turn
  }
  
  GetRound() : number {
    return this.round
  }
  
  GetPlayer(playerId: number) : IStatsEvaluable | null {
    if (playerId < 0 || playerId >= this.players.length) {
      return null
    }

    return this.players[playerId]
  }
  
  GetPlayers(): IStatsEvaluable[] {
    return this.players
  }
  
  UseSpell(spellId: number, params: SpellParams) {
    const effects = this.players[this.turn].CastSpell(spellId, params)
    this.enqueueEffects(effects)
  }

  EndTurn() {
    this.applyEffectsForTurn()
    
    this.setNextTurn()
  
    if (this.turn === 0) {
      this.setNextRound()
    }
    
    if (this.isGameOver()) {
      this.gameEventBus.Emit('game:over', null)
    }
  }
  
  IsGameOver(): boolean {
    return this.isGameOver()
  }
  
  private isGameOver(): boolean {
    if (this.round > this.maxRounds) {
      return true
    }
    
    let deadCount = 0
    for (const p of this.players) {
      if (p.Hp() <= 0) {
        deadCount++
      }
    }
    
    return deadCount >= this.players.length - 1
  }
  
  private setNextTurn() {
    this.turn = (this.turn + 1) % this.players.length
    this.gameEventBus.Emit('game:newTurn', {
      newTurn: this.turn
    })
  }
  
  private setNextRound() {
    this.round++
    this.gameEventBus.Emit('game:newRound', {
      newRound: this.round
    })
  }
  
  private enqueueEffects(effects: UsableSpellEffect[][]) {
    for (let i = 0; i < effects.length; i++) {
      const effectsPerTurn = effects[i]
      
      if (!this.effectsQueue[i]) {
        this.effectsQueue[i] = []
      }
      
      this.effectsQueue[i].push(...effectsPerTurn)
    }
  }
  
  private applyEffectsForTurn() {
    if (this.effectsQueue.length > 0) {
      const effectsPerTurn = this.effectsQueue.shift()
      if (effectsPerTurn === undefined) {
        return
      }
      
      while (effectsPerTurn.length > 0) {
        const effect = effectsPerTurn.pop()
        if (effect !== undefined) {
          effect.Use()
        }
      }
    }
  }
}