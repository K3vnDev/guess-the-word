import { WORD_NOT_FOUND_EVENT } from '../consts.d'

export function dispatchWordNotFound(rowIndex: number) {
  const event = new CustomEvent(WORD_NOT_FOUND_EVENT, { detail: { rowIndex } })
  document.dispatchEvent(event)
}
