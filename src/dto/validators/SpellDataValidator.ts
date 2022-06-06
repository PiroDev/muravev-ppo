import SpellData from '@/dto/SpellData'
import SpellEffectDataValidator from '@/dto/validators/SpellEffectDataValidator'
import IValidator from '@/dto/validators/IValidator'

export default class SpellDataValidator implements IValidator<SpellData> {
  private spellEffectValidator: SpellEffectDataValidator
  
  constructor() {
    this.spellEffectValidator = new SpellEffectDataValidator()
  }
  
  Validate(data: any): data is SpellData {
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
          if (!(this.spellEffectValidator.Validate(effect))) {
            return false
          }
        }
      }
      
      return true
    }
    
    return false
  }
}
