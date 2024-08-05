import { useEffect, useState } from 'react'
import { WORD_NOT_FOUND_EVENT } from '../consts.d'
import { useStore } from '../store/useStore'
import type { CellClassNames } from '../types'
import { useCooldown } from './useCooldown'

interface Params {
  rowIndex: number
}

const animationTime = 0.3

export function useRow({ rowIndex }: Params) {
  const { boardClassNames, currentRowIndex, currentCellIndex } = useStore(s => s)
  const [animation, setAnimation] = useState('none')

  const [triggerAnimation] = useCooldown({
    action: () => setAnimation(`row-shake ${animationTime}s ease both`),
    reset: () => setAnimation('none'),
    cooldown: animationTime * 1000
  })

  useEffect(() => {
    const handleWordNotFound = (e: Event) => {
      const { rowIndex: eventRowIndex } = (e as CustomEvent).detail
      if (eventRowIndex === rowIndex) triggerAnimation()
    }
    document.addEventListener(WORD_NOT_FOUND_EVENT, handleWordNotFound)
    return () => document.removeEventListener(WORD_NOT_FOUND_EVENT, handleWordNotFound)
  }, [])

  const rowIsSelected = currentRowIndex === rowIndex && currentCellIndex !== -1
  const className = rowIsSelected ? 'row selected' : 'row'

  const cellClassNames: CellClassNames = boardClassNames?.[rowIndex]
    ? boardClassNames[rowIndex]
    : Array(5).fill(null)

  return { cellClassNames, className, animation }
}
