import { ISpellRepository } from '@/data/repos'
import { SpellData } from '@/dto'
import MemoryPlayerRepository from '@/data/repos/memory/MemoryPlayerRepository'

export default class MemorySpellRepository implements ISpellRepository {
  private readonly playerRepo: MemoryPlayerRepository
  
  constructor(playerRepo: MemoryPlayerRepository) {
    this.playerRepo = playerRepo
  }
  
  AddSpell(playerName: string, spell: SpellData): void {
    const player = this.playerRepo.GetPlayer(playerName)
    if (!player) {
      return
    }
    
    const spells = player.Spells
    if (!spells.includes(spell)) {
      spells.push(spell)
    }
  }
  
  GetSpell(playerName: string, spellName: string): SpellData | null {
    const player = this.playerRepo.GetPlayer(playerName)
    if (!player) {
      return
    }
    
    const spells = player.Spells
    const spell = spells.find(s => s.Name === spellName)
    if (!spell) {
      return null
    }
    
    return spell
  }
  
  RemoveSpell(playerName: string, spellName: string): void {
    const player = this.playerRepo.GetPlayer(playerName)
    if (!player) {
      return
    }
  
    const spells = player.Spells
    const spellIndex = spells.findIndex(s => s.Name === spellName)
    if (spellIndex !== undefined) {
      spells.splice(spellIndex, 1)
    }
  }

}