import PlayerData from '@/structs/PlayerData'
import IPlayerRepository from '@/data/repos/IPlayerRepository'
import ISpellRepository from '@/data/repos/ISpellRepository'
import SpellData from '@/structs/SpellData'
import PlayerDataToPlayer from '@/data/boundary/converters/PlayerDataToPlayer'
import { PlayerToPlayerData, SpellDataToSpell, SpellToSpellData } from '@/data/boundary/converters'

export default class DataInteractor {
  private readonly playerRepo: IPlayerRepository
  private readonly spellRepo: ISpellRepository
  
  constructor(playerRepo: IPlayerRepository, spellRepo: ISpellRepository) {
    this.playerRepo = playerRepo
    this.spellRepo = spellRepo
  }
  
  AddPlayer(playerData: PlayerData) {
    const player = PlayerDataToPlayer.Convert(playerData)
    this.playerRepo.AddPlayer(player)
  }
  
  GetPlayer(playerName: string): PlayerData | null {
    const player = this.playerRepo.GetPlayer(playerName)
    return PlayerToPlayerData.Convert(player)
  }
  
  RemovePlayer(playerName: string) {
    this.playerRepo.RemovePlayer(playerName)
  }
  
  AddSpell(playerName: string, spellData: SpellData) {
    const spell = SpellDataToSpell.Convert(spellData)
    this.spellRepo.AddSpell(playerName, spell)
  }
  
  GetSpell(playerName: string, spellName: string): SpellData | null {
    const spell = this.spellRepo.GetSpell(playerName, spellName)
    return SpellToSpellData.Convert(spell)
  }
  
  RemoveSpell(playerName: string, spellName: string) {
    this.spellRepo.RemoveSpell(playerName, spellName)
  }
}