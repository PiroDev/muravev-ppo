import IMpAble from '@/game/stats/IMpAble'

export default interface IMpInteractable extends IMpAble {
  BurnMana(amount: number): void
  ReplenishMana(amount: number): void
}