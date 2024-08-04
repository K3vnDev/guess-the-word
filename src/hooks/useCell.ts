import { useStore } from '../store/useStore'

interface Params {
  cellIndex: number
  rowIndex: number
  cellClassName: string | null
}

export function useCell({ cellIndex, rowIndex, cellClassName }: Params) {
  const { setCurrentCellIndex, currentCellIndex, currentRowIndex } = useStore(s => s)

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

  return { className, handleClick }
}
