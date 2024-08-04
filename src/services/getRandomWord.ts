import { words } from '../consts.d'

export function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length)
  console.log(words[randomIndex])
  return words[randomIndex]
}
