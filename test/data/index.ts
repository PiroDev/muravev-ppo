import { memoryPlayerRepositoryTestSuite } from '#/data/MemoryPlayerRepository.test'
import { SpellRepositoryTestSuite } from '#/data/SpellRepository.test'

export const dataModuleTestSuites = () => {
  memoryPlayerRepositoryTestSuite()
  SpellRepositoryTestSuite()
}