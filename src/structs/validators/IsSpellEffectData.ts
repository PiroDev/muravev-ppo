import SpellEffectData from '@/structs/SpellEffectData'

export default function (data: any): data is SpellEffectData {
  const spellTypes = ['hp+', 'hp-', 'mp+', 'mp-']
  
  return !(!(data instanceof Object) || !Object.keys(data).length ||
    !(spellTypes.includes(data.Type)) || !(data.Params instanceof Array))
}