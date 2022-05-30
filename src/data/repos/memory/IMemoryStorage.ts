import { Player } from '@/data/models'

export default interface IMemoryStorage {
  Players(): {[name: string]: Player }
}