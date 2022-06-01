import { PlayerData } from '@/structs'
import { Player } from '@/data/models'
import SpellDataToSpell from '@/data/boundary/converters/SpellDataToSpell'

export default class PlayerDataToPlayer {
  static Convert(playerData: PlayerData): Player {
    const convertedSpells = playerData.Spells.map(s => SpellDataToSpell.Convert(s))
    return new Player(playerData.Name, convertedSpells)
  }
}