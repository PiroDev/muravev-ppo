import { memoryPlayerRepositoryTestSuite } from '#/data/MemoryPlayerRepository.test'
import { SpellRepositoryTestSuite } from '#/data/SpellRepository.test'
import { localStoragePlayerRepositoryTestSuite } from '#/data/LocalStoragePlayerRepository.test'


export const dataModuleTestSuites = () => {
  memoryPlayerRepositoryTestSuite()
  SpellRepositoryTestSuite()
  localStoragePlayerRepositoryTestSuite()
}