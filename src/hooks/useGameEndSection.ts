import confetti from 'canvas-confetti'
import { useEffect } from 'react'
import { NUMBER_OF_ROWS } from '../consts.d'
import { useStore } from '../store/useStore'

export function useGameEndSection() {
  const { boardClassNames, currentRowIndex, setCurrentCellIndex, winner, setWinner } = useStore(
    s => s
  )

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

  useEffect(() => {
    if (winner) confetti({ origin: { y: 0.7 } })
  }, [winner])

  const text = winner
    ? { message: 'Has ganado!', button: 'Jugar de nuevo' }
    : { message: 'Has perdido', button: 'Intentarlo de nuevo' }

  return { winner, text }
}
