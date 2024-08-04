import { useCell } from '../../hooks/useCell'
import './cell.css'

interface Props {
  cellContent: string
  cellIndex: number
  rowIndex: number
  cellClassName: string | null
}

export function Cell({ cellContent, rowIndex, cellIndex, cellClassName }: Props) {
  const { className, handleClick } = useCell({ rowIndex, cellIndex, cellClassName })

  return (
    <div className={className} onClick={handleClick}>
      {cellContent}
    </div>
  )
}
