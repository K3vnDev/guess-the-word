import { useEffect } from 'react'
import { useStore } from '../store/useStore'

export function useBoard() {
  const {
    moveCellIndexRight,
    moveCellIndexLeft,
    setCurrentCellContent,
    removeCurrentCellContent,
    goToNextRow
  } = useStore(s => s)

  const handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e

    if (key === 'ArrowRight') moveCellIndexRight()
    else if (key === 'ArrowLeft') moveCellIndexLeft()
    else if (key === 'Backspace') removeCurrentCellContent()
    else if (key === 'Enter') goToNextRow()
    else setCurrentCellContent(key)
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
}
