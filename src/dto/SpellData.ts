import SpellEffectData from '@/dto/SpellEffectData'

type SpellData = {
  Name: string
  Manacost: number
  Cooldown: number
  Params: string[]
  Effects: SpellEffectData[][]
}

export default SpellData