export default interface ISpellEffectGetter<EffectType extends keyof Effects, Effects> {
  GetSpellEffect(name: EffectType): Effects[EffectType]
}