import { useEffect, useState } from 'react'
import { NUMBER_OF_ROWS } from '../consts.d'
import { useStore } from '../store/useStore'
import type { Winner } from '../types.d'

export function useGameEndSection() {
  const { boardClassNames, currentRowIndex, setCurrentCellIndex } = useStore(s => s)
  const [winner, setWinner] = useState<Winner>(null)

  useEffect(() => {
    if (!boardClassNames) return
    const currentRowContent = boardClassNames[currentRowIndex - 1]
    const hasWon = currentRowContent.every(cell => cell === 'green')

    if (hasWon) {
      setCurrentCellIndex(-1)
      setWinner(true)
    } else if (
      currentRowIndex === NUMBER_OF_ROWS - 1 &&
      boardClassNames.length === NUMBER_OF_ROWS
    ) {
      const lastRowContent = boardClassNames[currentRowIndex]
      setCurrentCellIndex(-1)
      setWinner(lastRowContent.every(cell => cell === 'green'))
    }
  }, [boardClassNames])

  const resetState = () => setWinner(null)

  const text = winner
    ? { message: 'Has ganado!', button: 'Jugar de nuevo' }
    : { message: 'Has perdido', button: 'Intentarlo de nuevo' }

  return { winner, text, resetState }
}
