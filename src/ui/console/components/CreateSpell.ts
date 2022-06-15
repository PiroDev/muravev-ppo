import { displayOptions, input } from '@/ui/console/utils'
import { SpellData } from '@/dto'
import BaseSpellEffects from '@/game/spells/BaseSpellEffects'

export default class CreateSpell {
  private isRunning: boolean
  
  async CreateSpell(): Promise<SpellData> {
    this.isRunning = true
    let spellData: SpellData = {
      Name: '',
      Params: ['target'],
      Cooldown: 0,
      Manacost: 0,
      Effects: []
    }
    while (this.isRunning) {
      const spellName = await input('Название заклинания: ')
      if (spellName.length <= 1) {
        console.log('Название слишком короткое')
        continue
      }
      spellData.Name = spellName
      spellData.Manacost = +(await input('Манакост: '))
      spellData.Cooldown = +(await input('Кулдаун: '))
      while (this.isRunning) {
        displayOptions([
          '1: Добавить эффект',
          '0: Завершить создание заклинания'
        ])
        const ans = await input()
        if (ans === '1') {
          const effects = ['hp+', 'hp-', 'mp+', 'mp-']
          const options = effects.map((e, id) => (id + 1).toString() + ': ' + e)
          displayOptions(options)
          const ans = +(await input())
          const effect = effects[ans - 1]
          if (effect !== undefined) {
            const value = +(await input('Значение: '))
            spellData.Effects.push([{Params: ['target', value], Type: effect as keyof BaseSpellEffects}])
          }
        } else if (ans === '0') {
          this.isRunning = false
        } else {
          console.log('Такой команды нет')
        }
      }
    }
    
    return spellData
  }
}