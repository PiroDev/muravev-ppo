type GameEvents = {
  'game:newTurn': {
    newTurn: number
  }
  'game:newRound': {
    newRound: number
  }
  'game:over': {
    winner: number | undefined
  }
}

export default GameEvents