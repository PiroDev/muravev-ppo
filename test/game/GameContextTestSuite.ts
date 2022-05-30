import { Spell } from '@/game/spells'
import { Player } from '@/game/characters'
import { assertEq, defineTest } from '#/utils'
import GameContext from '@/game/GameContext'
import GameEventBus from '@/game/events/GameEventBus'
import { EventBus } from '@/game'

export const gameContextTestSuite = () => {
  
  const fireball = new Spell('Fireball', 1, 1, [
    [
      {
        Effect: (target, value) => {
          target.TakeDamage(value)
        },
        Params: ['target', 1]
      }
    ]
  ])
  
  const newPlayer = (name: string = 'Bob', spells: Spell[] = [fireball],
                     hp: number = 10, mp: number = 10) => new Player(name, spells, hp, mp)
  
  const newGame = () => {
    const eventBus: GameEventBus = new EventBus()
    return new GameContext([newPlayer(), newPlayer('Alex')], 10, eventBus)
  }
  
  defineTest('GameContext turn increases after player ends turn', () => {
    const game = newGame()
    
    game.EndTurn()
    
    return assertEq(game.GetTurn(), 1)
  })
  
  defineTest('GameContext round increases after all players ends turn', () => {
    const game = newGame()
    
    game.EndTurn()
    game.EndTurn()
    
    return assertEq(game.GetRound(), 1)
  })
  
  defineTest('GameContext UseSpell works fine', () => {
    const game = newGame()
    
    const [p1, p2] = game.GetPlayers()
    
    game.UseSpell(0, {target: p2})
    game.EndTurn()
    
    return assertEq(p2.Hp(), 9) && assertEq(p1.Mp(), 9)
  })
  
  defineTest('GameContext is over when player is dead', () => {
    const game = newGame()
    
    const [p1, p2] = game.GetPlayers()
    
    for (let i = 0; i < 10; i++) {
      game.UseSpell(0, {target: p2})
      game.EndTurn()
      game.UseSpell(0, {target: p1})
      game.EndTurn()
    }
    
    return assertEq(p2.Hp(), 0) && assertEq(game.IsGameOver(), true)
  })
}