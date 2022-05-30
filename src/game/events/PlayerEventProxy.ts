import Player from '@/game/characters/Player'
import { SpellParams, UsableSpellEffect } from '@/game/spells'
import { IEventEmitter, PlayerEvents } from '@/game/events'
import IMage from '@/game/characters/IMageCharacter'
import SpellOnCooldown from '@/game/spells/SpellOnCooldown'

export default class PlayerEventProxy implements IMage {
  private readonly player: Player
  private readonly emitter: IEventEmitter<PlayerEvents>
  private readonly id: number
  
  constructor(player: Player, id: number, emitter: IEventEmitter<PlayerEvents>) {
    this.player = player
    this.id = id
    this.emitter = emitter
  }
  
  BurnMana(amount: number): void {
    this.player.BurnMana(amount)
    this.emitter.Emit('player:manaBurned', {amount, id: this.id})
  }
  
  CastSpell(spellId: number, params: SpellParams): UsableSpellEffect[][] {
    return this.player.CastSpell(spellId, params)
  }
  
  Name(): string {
    return this.player.Name()
  }
  
  Hp(): number {
    return this.player.Hp()
  }
  
  MaxHp(): number {
    return this.player.MaxHp()
  }
  
  MaxMp(): number {
    return this.player.MaxMp()
  }
  
  Mp(): number {
    return this.player.Mp()
  }
  
  ReplenishMana(amount: number): void {
    this.player.ReplenishMana(amount)
    this.emitter.Emit('player:manaReplenished', {amount, id: this.id})
  }
  
  TakeDamage(amount: number): void {
    this.player.TakeDamage(amount)
    this.emitter.Emit('player:damageTaken', {amount, id: this.id})
  }
  
  TakeHealing(amount: number): void {
    this.player.TakeHealing(amount)
    this.emitter.Emit('player:healingTaken', {amount, id: this.id})
  }
  
  GetSpell(spellId: number): SpellOnCooldown | null {
    return this.player.GetSpell(spellId)
  }
  
  GetSpells(): SpellOnCooldown[] {
    return this.player.GetSpells()
  }
}