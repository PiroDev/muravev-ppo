import { PlayerData } from '@/structs'
import { Player } from '@/game/characters'
import SpellDataConverter from '@/game/boundary/converters/SpellDataConverter'

export default class PlayerDataConverter {
  Convert(playerData: PlayerData): Player {
    const spellDataConverter = new SpellDataConverter()
    const convertedSpells = playerData.Spells.map(s => spellDataConverter.Convert(s))
    return new Player(playerData.Name, convertedSpells)
  }
}