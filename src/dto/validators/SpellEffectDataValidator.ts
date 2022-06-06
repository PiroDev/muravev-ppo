import SpellEffectData from '@/dto/SpellEffectData'
import IValidator from '@/dto/validators/IValidator'

export default class SpellEffectDataValidator implements IValidator<SpellEffectData>{
  Validate(data: any): data is SpellEffectData {
    const spellTypes = ['hp+', 'hp-', 'mp+', 'mp-']
  
    return !(!(data instanceof Object) || !Object.keys(data).length ||
      !(spellTypes.includes(data.Type)) || !(data.Params instanceof Array))
  }
}