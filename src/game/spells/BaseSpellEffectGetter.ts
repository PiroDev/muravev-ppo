import BaseSpellEffects from '@/game/spells/BaseSpellEffects'
import ISpellEffectGetter from '@/game/spells/ISpellEffectGetter'

export default class BaseSpellEffectGetter<BaseEffectType extends keyof BaseSpellEffects> implements ISpellEffectGetter<BaseEffectType, BaseSpellEffects> {
  GetSpellEffect(name: BaseEffectType): BaseSpellEffects[BaseEffectType] {
    switch (name) {
      case 'hp+':
        return (target, value) => {
          target.TakeHealing(value)
        }
      case 'hp-':
        return (target, value) => {
          target.TakeDamage(value)
        }
      case 'mp+':
        return (target, value) => {
          target.ReplenishMana(value)
        }
      case 'mp-':
        return (target, value) => {
          target.BurnMana(value)
        }
    }
  }
}