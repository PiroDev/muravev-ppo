import ISpellRepository from '@/repos/ISpellRepository'
import { SpellData } from '@/dto'
import IPlayerRepository from '@/repos/IPlayerRepository'

export default class SpellRepository implements ISpellRepository {
  private playerRepo: IPlayerRepository
  
  constructor(playerRepo: IPlayerRepository) {
    this.playerRepo = playerRepo
  }
  
  SetSpell(playerName: string, spell: SpellData): void {
    const player = this.playerRepo.GetPlayer(playerName)
    if (!player) {
      return
    }
    
    const spells = player.Spells
    if (!spells.includes(spell)) {
      spells.push(spell)
    }
    
    this.playerRepo.SetPlayer(player)
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
    
    this.playerRepo.SetPlayer(player)
  }
}