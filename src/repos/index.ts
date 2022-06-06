import ISpellRepository from '@/repos/ISpellRepository'
import IPlayerRepository from '@/repos/IPlayerRepository'
import SpellRepository from '@/repos/SpellRepository'
import * as memory from '@/repos/memory'
import { LocalStoragePlayerRepository } from '@/repos/localStorage'

export {memory, IPlayerRepository, ISpellRepository, SpellRepository, LocalStoragePlayerRepository}