import { useCell } from '../../hooks/useCell'
import './cell.css'

interface Props {
  cellContent: string
  cellIndex: number
  rowIndex: number
  cellClassName: string | null
}

export function Cell({ cellContent, rowIndex, cellIndex, cellClassName }: Props) {
  const { className, handleClick, animation } = useCell({
    rowIndex,
    cellIndex,
    cellClassName,
    cellContent
  })

  return (
    <div className={className} onClick={handleClick}>
      <span style={{ animation }}>{cellContent}</span>
    </div>
  )
}
