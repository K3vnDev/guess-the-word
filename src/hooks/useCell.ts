import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import { useCooldown } from './useCooldown'

interface Params {
  cellIndex: number
  rowIndex: number
  cellClassName: string | null
  cellContent: string
}

const animationTime = 0.4

export function useCell({ cellIndex, rowIndex, cellClassName, cellContent }: Params) {
  const { setCurrentCellIndex, currentCellIndex, currentRowIndex } = useStore(s => s)
  const [animation, setAnimation] = useState('none')

  const [triggerAnimation] = useCooldown({
    action: () => setAnimation(`cell-pop ${animationTime}s ease both`),
    reset: () => setAnimation('none'),
    cooldown: animationTime * 1000
  })

  useEffect(() => {
    if (cellContent) triggerAnimation()
  }, [cellContent])

  const handleClick = () => {
    if (currentRowIndex === rowIndex) setCurrentCellIndex(cellIndex)
  }

  const className = (() => {
    let newClassName = 'cell'
    const add = (value: string) => {
      newClassName += ` ${value}`
    }
    if (currentCellIndex === cellIndex && currentRowIndex === rowIndex) add('selected')
    if (cellClassName) add(cellClassName)

    return newClassName
  })()

  return { className, handleClick, animation }
}
