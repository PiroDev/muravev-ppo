// @ts-ignore
import * as readline from 'node:readline/promises'
import { stdin, stdout } from 'process'

export async function input(question: string = 'Введите команду: '): Promise<string> {
  const rl = readline.createInterface({input: stdin, output: stdout})
  const answer = await rl.question(question)
  rl.close()
  
  return answer
}

export function displayOptions(options: string[], entry: string = 'Доступные команды:') {
  console.log(entry)
  console.log(options.join('\n'))
}

export async function entry(header: string, text: string = 'Нажмите Enter чтобы продолжить...') {
  console.log(header)
  await input(text)
}