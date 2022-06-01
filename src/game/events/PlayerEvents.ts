type PlayerEvents = {
  'player:damageTaken': {
    id: number
    amount: number
  }
  'player:healingTaken': {
    id: number
    amount: number
  }
  'player:manaReplenished': {
    id: number
    amount: number
  }
  'player:manaBurned': {
    id: number
    amount: number
  }
}

export default PlayerEvents