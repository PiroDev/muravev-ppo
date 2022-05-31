import { playerTestSuite } from '#/game/PlayerTestSuite'
import { gameContextTestSuite } from '#/game/GameContextTestSuite'
import { spellOnCooldownTestSuite } from '#/game/SpellOnCooldownTestSuite'

export const gameModuleTestSuites = () => {
  playerTestSuite()
  gameContextTestSuite()
  spellOnCooldownTestSuite()
}

