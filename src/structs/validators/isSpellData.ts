import SpellData from '@/structs/SpellData'
import isSpellEffectData from '@/structs/validators/IsSpellEffectData'

export default function (data: any): data is SpellData {
  if (!(data instanceof Object) || !Object.keys(data).length) {
    return false
  }
  
  if (typeof data.Name === 'string' && typeof data.Manacost === 'number' && typeof data.Cooldown === 'number' &&
    data.Params instanceof Array && data.Effects instanceof Array) {
    for (const item of data.Params) {
      if (typeof item !== 'string') {
        return false
      }
    }
    
    for (const arr of data.Effects) {
      if (!(arr instanceof Array)) {
        return false
      }
      
      for (const effect of arr) {
        if (!(isSpellEffectData(effect))) {
          return false
        }
      }
    }
    
    return true
  }
  
  return false
}