import { IStatsEvaluable } from '@/game/stats'
import SpellInfo from '@/game/boundary/interfaces/SpellInfo'

export default interface IPlayerInfo extends IStatsEvaluable {
  GetSpell(spellId: number): SpellInfo | null
  GetSpells(): SpellInfo[]
}