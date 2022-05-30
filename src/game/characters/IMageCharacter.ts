import ICharacter from '@/game/characters/ICharacter'
import { SpellParams, UsableSpellEffect } from '@/game/spells'
import SpellOnCooldown from '@/game/spells/SpellOnCooldown'

export default interface IMageCharacter extends ICharacter {
  CastSpell(spellId: number, params: SpellParams): UsableSpellEffect[][]
  GetSpells(): SpellOnCooldown[]
  GetSpell(spellId: number): SpellOnCooldown | null
}