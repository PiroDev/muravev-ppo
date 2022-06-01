import IHpAble from '@/game/stats/IHpAble'

export default interface IHpInteractable extends IHpAble {
  TakeDamage(amount: number): void
  TakeHealing(amount: number): void
}