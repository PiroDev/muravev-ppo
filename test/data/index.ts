import { memoryPlayerRepositoryTestSuite } from '#/data/MemoryPlayerRepository.test'
import { memorySpellRepositoryTestSuite } from '#/data/MemorySpellRepository.test'

export const dataModuleTestSuites = () => {
  memoryPlayerRepositoryTestSuite()
  memorySpellRepositoryTestSuite()
}