import { useRow } from '../../hooks/useRow'
import { Cell } from '../Cell/Cell'
import './row.css'

interface Props {
  content: string[]
  index: number
}

export function Row({ content: rowContent, index: rowIndex }: Props) {
  const { cellClassNames, className, animation } = useRow({ rowIndex })

  return (
    <div className={className} style={{ animation }}>
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
