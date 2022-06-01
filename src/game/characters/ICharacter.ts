import IHpInteractable from '@/game/stats/IHpInteractable'
import IMpInteractable from '@/game/stats/IMpInteractable'
import INameAble from '@/game/stats/INameAble'

export default interface ICharacter extends IHpInteractable, IMpInteractable, INameAble {}