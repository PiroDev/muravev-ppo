import PlayerData from '@/structs/PlayerData'
import isSpellData from '@/structs/validators/isSpellData'

export default function(data: any): data is PlayerData {
  if (!(data instanceof Object) || !Object.keys(data).length) {
    return false
  }
  
  if (typeof data.Name === 'string' && data.Spells instanceof Array) {
    for (const item of data.Spells) {
      if (!isSpellData(item)) {
        return false
      }
    }
    
    return true
  }
  
  return false
}