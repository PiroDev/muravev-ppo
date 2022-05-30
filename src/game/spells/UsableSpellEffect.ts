export default class UsableSpellEffect {
  private readonly effect: () => void
  
  constructor(effect: () => void) {
    this.effect = effect
  }
  
  Use() {
    this.effect()
  }
}