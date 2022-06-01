import { ICharacter } from '@/game/characters'

type BaseSpellEffects = {
  'hp+': (target: ICharacter, value: number) => void
  'hp-': (target: ICharacter, value: number) => void
  'mp+': (target: ICharacter, value: number) => void
  'mp-': (target: ICharacter, value: number) => void
}

export default BaseSpellEffects