import { PlayerData } from '@/dto'

export default interface IMemoryStorage {
  Players(): { [name: string]: PlayerData }
}