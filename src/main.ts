import ConsoleUI from '@/ui/console/ConsoleUI'
import { GameInteractor } from '@/game/boundary'
import { LocalStoragePlayerRepository, SpellRepository } from '@/repos'
import { LocalStorage } from 'node-localstorage'

global.localStorage = new LocalStorage('./scratch')
const playerRepo = new LocalStoragePlayerRepository()
const spellRepo = new SpellRepository(playerRepo)
const game = new GameInteractor(playerRepo, spellRepo)

const ui = new ConsoleUI(game)
await ui.Run()
