import { ISpellRepository } from '@/data/repos'
import { Spell } from '@/data/models'
import MemoryPlayerRepository from '@/data/repos/memory/MemoryPlayerRepository'

export default class MemorySpellRepository implements ISpellRepository {
  private readonly playerRepo: MemoryPlayerRepository
  
  constructor(playerRepo: MemoryPlayerRepository) {
    this.playerRepo = playerRepo
  }
  
  AddSpell(playerName: string, spell: Spell): void {
    const player = this.playerRepo.GetPlayer(playerName)
    if (!player) {
      return
    }
    
    const spells = player.Spells()
    if (!spell[spell.Name()]) {
      spells[spell.Name()] = spell
    }
  }
  
  GetSpell(playerName: string, spellName: string): Spell | null {
    const player = this.playerRepo.GetPlayer(playerName)
    if (!player) {
      return
    }
    
    const spells = player.Spells()
    if (!spells[spellName]) {
      return null
    }
    
    return spells[spellName]
  }
  
  RemoveSpell(playerName: string, spellName: string): void {
    const player = this.playerRepo.GetPlayer(playerName)
    if (!player) {
      return
    }
  
    const spells = player.Spells()
    spells[spellName] = undefined
  }

}