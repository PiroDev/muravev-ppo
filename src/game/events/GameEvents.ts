type GameEvents = {
  'game:newTurn': {
    newTurn: number
  }
  'game:newRound': {
    newRound: number
  }
  'game:over': {
    winner: number | null
  }
}

export default GameEvents