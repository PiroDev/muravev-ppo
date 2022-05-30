import Player from '@/data/models/Player'

export default interface IPlayerRepository {
  AddPlayer(player: Player): void
  GetPlayer(name: string): Player | null
  RemovePlayer(name: string): void
}