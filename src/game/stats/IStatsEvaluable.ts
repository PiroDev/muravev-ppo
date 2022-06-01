import IHpAble from '@/game/stats/IHpAble'
import IMpAble from '@/game/stats/IMpAble'
import INameAble from '@/game/stats/INameAble'

export default interface IStatsEvaluable extends IHpAble, IMpAble, INameAble {}