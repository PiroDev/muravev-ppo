import BaseSpellEffects from '@/game/spells/BaseSpellEffects'

export default function GetBaseSpellEffect<BaseEffectType extends keyof BaseSpellEffects>(name: BaseEffectType): BaseSpellEffects[BaseEffectType] {
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