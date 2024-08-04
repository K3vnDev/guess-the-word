import { useStore } from '../store/useStore'
import type { CellClassNames } from '../types'

interface Params {
  rowIndex: number
}

export function useRow({ rowIndex }: Params) {
  const { boardClassNames } = useStore(s => s)

  const cellClassNames: CellClassNames = boardClassNames?.[rowIndex]
    ? boardClassNames[rowIndex]
    : Array(5).fill(null)

  return { cellClassNames }
}
