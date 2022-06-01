import SpellEffectData from '@/structs/SpellEffectData'

type SpellData = {
  Name: string
  Manacost: number
  Cooldown: number
  Params: string[]
  Effects: SpellEffectData[][]
}

export default SpellData