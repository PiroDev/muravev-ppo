import { PlayerData } from '@/dto'

export default interface IPlayerRepository {
  AddPlayer(player: PlayerData): void
  GetPlayer(name: string): PlayerData | null
  RemovePlayer(name: string): void
}
