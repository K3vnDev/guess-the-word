import { useRow } from '../../hooks/useRow'
import { useStore } from '../../store/useStore'
import { Cell } from '../Cell/Cell'
import './row.css'

interface Props {
  content: string[]
  index: number
}

export function Row({ content: rowContent, index: rowIndex }: Props) {
  const { currentRowIndex, currentCellIndex } = useStore(s => s)
  const { cellClassNames } = useRow({ rowIndex })
  const className = currentRowIndex === rowIndex && currentCellIndex !== -1 ? 'row selected' : 'row'

  return (
    <div className={className}>
      {rowContent.map((cell, index) => (
        <Cell
          cellContent={cell}
          cellIndex={index}
          rowIndex={rowIndex}
          cellClassName={cellClassNames[index]}
          key={index}
        />
      ))}
    </div>
  )
}
