import { PlayerData } from '@/structs'
import { Player } from '@/data/models'
import SpellToSpellData from '@/data/boundary/converters/SpellToSpellData'

export default class PlayerToPlayerData {
  static Convert(player: Player): PlayerData {
    const convertedSpells = player.Spells().map(s => SpellToSpellData.Convert(s))
    return {Name: player.Name(), Spells: convertedSpells}
  }
}