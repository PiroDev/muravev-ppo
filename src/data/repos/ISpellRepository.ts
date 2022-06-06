import { SpellData } from '@/dto'

export default interface ISpellRepository {
  AddSpell(playerName: string, spell: SpellData): void
  GetSpell(playerName: string, spellName: string): SpellData | null
  RemoveSpell(playerName: string, spellName: string): void
}