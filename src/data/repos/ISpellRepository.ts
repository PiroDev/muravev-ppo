import Spell from '@/data/models/Spell'

export default interface ISpellRepository {
  AddSpell(playerName: string, spell: Spell): void
  GetSpell(playerName: string, spellName: string): Spell | null
  RemoveSpell(playerName: string, spellName: string): void
}