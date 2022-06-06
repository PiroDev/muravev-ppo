import PlayerData from '@/dto/PlayerData'
import SpellDataValidator from '@/dto/validators/SpellDataValidator'
import IValidator from '@/dto/validators/IValidator'

export default class PlayerDataValidator implements IValidator<PlayerData> {
  private readonly spellValidator: SpellDataValidator
  
  constructor() {
    this.spellValidator = new SpellDataValidator()
  }
  
  Validate(data: any): data is PlayerData {
    if (!(data instanceof Object) || !Object.keys(data).length) {
      return false
    }
    
    if (typeof data.Name === 'string' && data.Spells instanceof Array) {
      for (const item of data.Spells) {
        if (!this.spellValidator.Validate(item)) {
          return false
        }
      }
      
      return true
    }
    
    return false
  }
}